import { useEffect, useState } from "react";

import {
    createPost,
    deletePost,
    getPosts,
} from "../api/posts";

function CommunityReviews() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // NEW
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  const USER_ID =
    "6a35205a08b19d32604d5619";

  const fetchPosts = async () => {
    try {
      const response =
        await getPosts();

      setPosts(
        response?.data?.data || []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to refresh reviews."
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      try {
        setLoading(true);

        const response =
          await getPosts();

        if (mounted) {
          setPosts(
            response?.data?.data || []
          );
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(
            "Unable to connect to backend."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !content.trim()
    ) {
      setError(
        "Please complete all fields."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "authorId",
        USER_ID
      );

      if (image) {
        formData.append(
          "thumbnail",
          image
        );
      }

      await createPost(formData);

      setTitle("");
      setContent("");
      setImage(null);

      setSuccess(
        "Review posted successfully!"
      );

      await fetchPosts();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.error ||
          "Failed to create review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);

      setPosts((prev) =>
        prev.filter(
          (post) =>
            post._id !== id
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        "Failed to delete review."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>
          🎬 Community Reviews
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
          }}
        >
          {posts.length} Reviews Shared
        </p>

        {success && (
          <div
            style={{
              background:
                "rgba(76,175,80,0.15)",
              border:
                "1px solid #4caf50",
              color: "#4caf50",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              background:
                "rgba(244,67,54,0.15)",
              border:
                "1px solid #f44336",
              color: "#f44336",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}

        <div
          style={{
            background: "#1e1e1e",
            padding: "24px",
            borderRadius: "14px",
            marginBottom: "30px",
          }}
        >
          <h2>
            Write a Review
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              placeholder="Review Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius:
                  "8px",
                border: "none",
                marginBottom:
                  "12px",
              }}
            />

            {/* IMAGE PICKER */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              style={{
                width: "100%",
                marginBottom:
                  "12px",
                color: "white",
              }}
            />

            <textarea
              placeholder="Share your thoughts about a movie..."
              value={content}
              maxLength={500}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                height: "140px",
                padding: "12px",
                borderRadius:
                  "8px",
                border: "none",
                resize:
                  "vertical",
              }}
            />

            <p
              style={{
                color: "#aaa",
                fontSize:
                  "13px",
              }}
            >
              {content.length}/500
              characters
            </p>

            <button
              type="submit"
              disabled={
                submitting
              }
              style={{
                padding:
                  "12px 20px",
                border: "none",
                borderRadius:
                  "8px",
                background:
                  "#ff4b2b",
                color: "white",
                cursor:
                  "pointer",
              }}
            >
              {submitting
                ? "Posting..."
                : "Post Review"}
            </button>
          </form>
        </div>

        {loading && (
          <div
            style={{
              textAlign:
                "center",
              padding:
                "40px",
            }}
          >
            Loading Reviews...
          </div>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              background:
                "#1e1e1e",
              borderRadius:
                "14px",
              padding:
                "20px",
              marginBottom:
                "20px",
            }}
          >
            {/* IMAGE */}

            {post.imageUrl && (
                <img
                src={post.imageUrl}
                alt={post.title}
                style={{
      width: "100%",
      height: "auto",
      maxHeight: "500px",
      objectFit: "contain",
      borderRadius: "12px",
      background: "#111",
      marginBottom: "15px",
    }}
  />
)}

            <h3>
              {post.title}
            </h3>

            <p>
              {post.content}
            </p>

            <p
              style={{
                color:
                  "#bbbbbb",
              }}
            >
              👤{" "}
              {post.authorId
                ?.name ||
                "Unknown User"}
            </p>

            {post.createdAt && (
              <p
                style={{
                  color:
                    "#999",
                  fontSize:
                    "12px",
                }}
              >
                📅{" "}
                {new Date(
                  post.createdAt
                ).toLocaleDateString()}
              </p>
            )}

            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this review?"
                  )
                ) {
                  handleDelete(
                    post._id
                  );
                }
              }}
              style={{
                marginTop:
                  "10px",
                padding:
                  "8px 16px",
                border: "none",
                borderRadius:
                  "6px",
                background:
                  "crimson",
                color: "white",
                cursor:
                  "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityReviews;