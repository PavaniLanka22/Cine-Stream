import { useEffect, useMemo, useState } from "react";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { debounce } from "../utils/debounce";

import { getMovieFromMood } from "../api/ai";

import "./Navbar.css";


function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [searchParams] =
    useSearchParams();

  // -----------------------------
  // NORMAL SEARCH
  // -----------------------------
  const [search, setSearch] =
    useState(
      searchParams.get("q") || ""
    );

  // -----------------------------
  // AI SEARCH
  // -----------------------------
  const [moodSearch, setMoodSearch] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  // -----------------------------
  // SYNC URL → INPUT
  // -----------------------------
  useEffect(() => {
    if (location.pathname !== "/")
      return;

    const timeout = setTimeout(() => {
      setSearch(
        searchParams.get("q") || ""
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, [searchParams, location.pathname]);

  // -----------------------------
  // NORMAL SEARCH DEBOUNCE
  // -----------------------------
  const debouncedNavigate =
    useMemo(
      () =>
        debounce((value) => {
          if (
            location.pathname !== "/"
          )
            return;

          if (value.trim()) {
            navigate(
              `/?q=${encodeURIComponent(
                value
              )}`
            );
          } else {
            navigate("/");
          }
        }, 500),
      [navigate, location.pathname]
    );

  // -----------------------------
  // AUTO SEARCH
  // -----------------------------
  useEffect(() => {
    if (location.pathname !== "/")
      return;

    debouncedNavigate(search);
  }, [
    search,
    debouncedNavigate,
    location.pathname,
  ]);

  // -----------------------------
  // AI MOOD SEARCH
  // -----------------------------
  const handleMoodSearch =
    async () => {
      if (!moodSearch.trim())
        return;

      try {
        setAiLoading(true);

        const movieTitle =
          await getMovieFromMood(
            moodSearch
          );

        console.log(
          "AI MOVIE TITLE:",
          movieTitle
        );

        if (!movieTitle) {
          setAiLoading(false);
          return;
        }

        // update search
        setSearch(movieTitle);

        // trigger TMDB search
        navigate(
          `/?q=${encodeURIComponent(
            movieTitle
          )}`
        );

        setMoodSearch("");
      } catch (err) {
        console.error(
          "Mood Search Error:",
          err
        );
      } finally {
        setAiLoading(false);
      }
    };

  return (
    <>
      {/* LOADING BANNER */}
      {aiLoading && (
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg, #ff416c, #ff4b2b)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontWeight: "600",
            position: "sticky",
            top: 0,
            zIndex: 999,
            animation:
              "slideDown 0.3s ease",
          }}
        >
          🎬 Finding new movies for your mood...
        </div>
      )}

      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "#181818",
          gap: "20px",
          flexWrap: "wrap",
          position: "sticky",
          top: aiLoading ? "44px" : 0,
          zIndex: 998,
        }}
      >

        {/* LEFT */}
        <div className="nav-left">
          <span
            className="logo"
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            🎬 Cine Stream
          </span>
        </div>

        {/* CENTER */}
        <div
          className="nav-center"
          style={{
            display: "flex",
            gap: "14px",
            flex: 1,
            justifyContent:
              "center",
            flexWrap: "wrap",
          }}
        >

          {/* NORMAL SEARCH */}
          <input
            className="search"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
            }}
            style={{
              width: "320px",
              padding: "12px 16px",
              borderRadius: "10px",
              border:
                "1px solid #333",
              background: "#222",
              color: "white",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* AI SEARCH */}
          <input
            className="search"
            placeholder='AI Mood Match (e.g. "sad emotional sci-fi")'
            value={moodSearch}
            onChange={(e) => {
              setMoodSearch(
                e.target.value
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMoodSearch();
              }
            }}
            style={{
              width: "320px",
              padding: "12px 16px",
              borderRadius: "10px",
              border:
                "1px solid #333",
              background: "#222",
              color: "white",
              fontSize: "15px",
              outline: "none",
            }}
          />

        </div>

        {/* RIGHT */}
        <div
          className="nav-right"
          style={{
            display: "flex",
            gap: "12px",
          }}
        >


<button
  className="nav-btn"
  onClick={() =>
    navigate("/reviews")
  }
  style={{
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#ff4b2b",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Reviews
</button>

          <button
            className="nav-btn"
            onClick={() =>
              navigate("/")
            }
            style={{
              padding:
                "10px 18px",
              borderRadius: "8px",
              border: "none",
              background:
                "#ff416c",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Home
          </button>

          <button
            className="nav-btn"
            onClick={() =>
              navigate(
                "/favorites"
              )
            }
            style={{
              padding:
                "10px 18px",
              borderRadius: "8px",
              border: "none",
              background:
                "#ff4b2b",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Favorites
          </button>

        </div>

      </nav>
    </>
  );
}

export default Navbar;