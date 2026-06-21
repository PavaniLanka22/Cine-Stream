import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getPosts = () =>
  axios.get(`${API_URL}/posts`);

export const deletePost = (id) =>
  axios.delete(
    `${API_URL}/posts/${id}`
  );

export const updatePost = (
  id,
  data
) =>
  axios.put(
    `${API_URL}/posts/${id}`,
    data
  );

export const createPost = (
  formData
) =>
  axios.post(
    `${API_URL}/posts`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );