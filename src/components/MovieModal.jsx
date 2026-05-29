import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const image = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt={movie.title} />

        <h2>{movie.title}</h2>

        <p>{movie.overview}</p>

        <p>⭐ {movie.vote_average}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default MovieModal;