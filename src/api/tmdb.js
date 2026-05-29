const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Vite style (recommended)

if (!API_KEY) {
  console.error("Missing TMDB API Key in .env file");
}

// Helper fetch function
async function fetchFromTMDB(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return { results: [] };
  }
}

// Popular movies
export function fetchPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

// Search movies
export function searchMovies(query, page = 1) {
  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
}