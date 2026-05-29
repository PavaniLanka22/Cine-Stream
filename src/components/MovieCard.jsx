import "./MovieCard.css";

import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie, onSelect }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <div className="movie-card">

      {/* POSTER */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        decoding="async"
        onClick={() => onSelect(movie)}
      />

      {/* INFO */}
      <div className="movie-info">

        {/* TITLE */}
        <h3>{movie.title}</h3>

        {/* YEAR */}
        <p className="movie-year">
          📅 {year}
        </p>

        {/* RATING */}
        <p className="movie-rating">
          ⭐ Rating: {movie.vote_average?.toFixed(1)}
        </p>

        {/* HEART BUTTON */}
        <button onClick={() => toggleFavorite(movie)}>
          {isFavorite
            ? "❤️ Remove Favorite"
            : "🤍 Add Favorite"}
        </button>

      </div>
    </div>
  );
}

export default MovieCard;