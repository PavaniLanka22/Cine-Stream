import { useState } from "react";

import {
  useFavorites,
} from "../context/FavoritesContext";

import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Favorites() {

  const { favorites } = useFavorites();

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        color: "white",
      }}
    >

      <h2
        style={{
          padding: "20px",
          margin: 0,
        }}
      >
        ❤️ My Favorites
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",

          gap: "24px",
          padding: "20px",
        }}
      >

        {favorites.length === 0 ? (
          <p>No favorite movies added.</p>
        ) : (
          favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={setSelectedMovie}
            />
          ))
        )}

      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
}

export default Favorites;