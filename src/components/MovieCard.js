import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMovieRatings } from '../services/firestore';

function MovieCard({ movie, isFavorite, isWatched, isWatchlisted, onToggleFavorite, onToggleWatched, onToggleWatchlist }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState(0);
  const [favPopping, setFavPopping] = useState(false);
  const [watchedPopping, setWatchedPopping] = useState(false);
  const [starVibrating, setStarVibrating] = useState(false);

  useEffect(() => {
    getMovieRatings(movie.id).then(ratings => {
      if (ratings.length === 0) return;
      setAvgRating(Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length));
    });
  }, [movie.id]);

  const triggerPop = (setter) => {
    if (!document.body.classList.contains('theme-animated')) return;
    setter(true);
    setTimeout(() => setter(false), 350);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return navigate('/login');
    triggerPop(setFavPopping);
    onToggleFavorite(movie.id);
  };

  const handleWatched = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return navigate('/login');
    triggerPop(setWatchedPopping);
    onToggleWatched(movie.id);
  };

  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return navigate('/login');
    triggerPop(setStarVibrating);
    onToggleWatchlist(movie.id);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-poster">
        {movie.posterUrl
          ? <img src={movie.posterUrl} alt={movie.title} />
          : <div className="movie-card-placeholder">{movie.title}</div>
        }
        <button
          className={`watchlist-star ${isWatchlisted ? 'watchlist-star--active' : ''} ${starVibrating ? 'vibrating' : ''}`}
          onClick={handleWatchlist}
          title={currentUser ? (isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist') : 'Log in to add to watchlist'}
        >
          {isWatchlisted ? '★' : '☆'}
        </button>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-meta">{movie.year} &middot; {movie.genres.join(', ')}</p>
        <p className="movie-card-director">dir. {movie.director}</p>
        {avgRating > 0 && (
          <p className="movie-card-avg-rating">
            {'★'.repeat(avgRating)}{'☆'.repeat(5 - avgRating)}
          </p>
        )}
        <div className="movie-card-toggles">
          <button
            className={`toggle-btn ${isFavorite ? 'toggle-btn--active' : ''} ${favPopping ? 'popping' : ''}`}
            onClick={handleFavorite}
            title={currentUser ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Log in to favorite'}
          >
            {isFavorite ? '♥' : '♡'} Favorite
          </button>
          <button
            className={`toggle-btn ${isWatched ? 'toggle-btn--active' : ''} ${watchedPopping ? 'popping' : ''}`}
            onClick={handleWatched}
            title={currentUser ? (isWatched ? 'Mark as unwatched' : 'Mark as watched') : 'Log in to track'}
          >
            {isWatched ? '✓' : '○'} Watched
          </button>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
