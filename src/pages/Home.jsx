import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from "../api/tmdb";
import { debounce } from "../utils/debounce";

import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const prevQueryRef = useRef("");

  // -----------------------------
  // SAFE QUERY RESET (NO WARNING)
  // -----------------------------
  useEffect(() => {
    if (prevQueryRef.current === query) return;

    prevQueryRef.current = query;

    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // -----------------------------
  // FETCH MOVIES
  // -----------------------------
  const fetchMovies = useCallback(async (q, p) => {
    if (loading) return;

    setLoading(true);

    try {
      const data = q
        ? await searchMovies(q, p)
        : await fetchPopularMovies(p);

      const results = data?.results || [];

      setMovies((prev) =>
        p === 1 ? results : [...prev, ...results]
      );

      if (!results.length) setHasMore(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // -----------------------------
  // DEBOUNCED FETCH (SAFE INIT)
  // -----------------------------
  const debouncedFetchRef = useRef(null);

  useEffect(() => {
    debouncedFetchRef.current = debounce((q, p) => {
      fetchMovies(q, p);
    }, 500);
  }, [fetchMovies]);

  // -----------------------------
  // TRIGGER FETCH ON QUERY/PAGE
  // -----------------------------
  useEffect(() => {
    if (!debouncedFetchRef.current) return;
    if (!hasMore) return;

    debouncedFetchRef.current(query, page);
  }, [query, page, hasMore]);

  // -----------------------------
  // INFINITE SCROLL
  // -----------------------------
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0,
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "white" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
          padding: "20px",
        }}
      >
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;

          return (
            <div key={movie.id} ref={isLast ? lastMovieRef : null}>
              <MovieCard movie={movie} onSelect={setSelectedMovie} />
            </div>
          );
        })}
      </div>

      {loading && (
        <p style={{ textAlign: "center", padding: "20px" }}>
          Loading more movies...
        </p>
      )}

      {!hasMore && (
        <p style={{ textAlign: "center", padding: "20px", opacity: 0.6 }}>
          No more movies
        </p>
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default Home;