import { Link } from 'react-router-dom';

function MovieCard({ movie, isFavorite, isWatched, onToggleFavorite, onToggleWatched }) {
  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  const handleWatched = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWatched(movie.id);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-poster">
        {movie.posterUrl
          ? <img src={movie.posterUrl} alt={movie.title} />
          : <div className="movie-card-placeholder">{movie.title}</div>
        }
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-meta">{movie.year} &middot; {movie.genres.join(', ')}</p>
        <p className="movie-card-director">dir. {movie.director}</p>
        <div className="movie-card-toggles">
          <button
            className={`toggle-btn ${isFavorite ? 'toggle-btn--active' : ''}`}
            onClick={handleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '♥' : '♡'} Favorite
          </button>
          <button
            className={`toggle-btn ${isWatched ? 'toggle-btn--active' : ''}`}
            onClick={handleWatched}
            title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
          >
            {isWatched ? '✓' : '○'} Watched
          </button>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
