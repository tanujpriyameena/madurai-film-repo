import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import movies from '../data/movies';
import StarRating from '../components/StarRating';

function Movie({ favorites, watched, toggleFavorite, toggleWatched }) {
  const { id } = useParams();
  const movie = movies.find(m => m.id === Number(id));

  const [rating, setRating] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('ratings') || '{}');
    return stored[id] || 0;
  });

  const [savedReview, setSavedReview] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('reviews') || '{}');
    return stored[id] || '';
  });

  const [reviewText, setReviewText] = useState(savedReview);
  const [editing, setEditing] = useState(savedReview === '');

  if (!movie) {
    return (
      <main className="page-placeholder">
        <h1>Film not found</h1>
        <p>This film doesn't exist in the collection. <Link to="/collections">Back to Collections</Link></p>
      </main>
    );
  }

  const handleRate = (star) => {
    const stored = JSON.parse(localStorage.getItem('ratings') || '{}');
    stored[id] = star;
    localStorage.setItem('ratings', JSON.stringify(stored));
    setRating(star);
  };

  const handleSaveReview = () => {
    const stored = JSON.parse(localStorage.getItem('reviews') || '{}');
    stored[id] = reviewText;
    localStorage.setItem('reviews', JSON.stringify(stored));
    setSavedReview(reviewText);
    setEditing(false);
  };

  const handleDeleteReview = () => {
    const stored = JSON.parse(localStorage.getItem('reviews') || '{}');
    delete stored[id];
    localStorage.setItem('reviews', JSON.stringify(stored));
    setSavedReview('');
    setReviewText('');
    setEditing(true);
  };

  return (
    <main className="movie-page">
      <Link to="/collections" className="back-link">← Back to Collections</Link>
      <div className="movie-detail">
        <div className="movie-detail-poster">
          {movie.posterUrl
            ? <img src={movie.posterUrl} alt={movie.title} />
            : <div className="movie-detail-placeholder">{movie.title}</div>
          }
        </div>

        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <p className="movie-detail-meta">{movie.year} &middot; {movie.genres.join(', ')}</p>
          <p className="movie-detail-director">Directed by <strong>{movie.director}</strong></p>
          <p className="movie-detail-cast"><span className="detail-label">Cast</span> {movie.cast.join(', ')}</p>
          <p className="movie-detail-description">{movie.description}</p>
        </div>
      </div>

      <div className="movie-detail-actions">
        <button
          className={`toggle-btn toggle-btn--large ${favorites.includes(movie.id) ? 'toggle-btn--active' : ''}`}
          onClick={() => toggleFavorite(movie.id)}
        >
          {favorites.includes(movie.id) ? '♥ Favorited' : '♡ Add to Favorites'}
        </button>
        <button
          className={`toggle-btn toggle-btn--large ${watched.includes(movie.id) ? 'toggle-btn--active' : ''}`}
          onClick={() => toggleWatched(movie.id)}
        >
          {watched.includes(movie.id) ? '✓ Watched' : '○ Mark as Watched'}
        </button>
      </div>

      <section className="movie-user-section">
        <div className="movie-user-block">
          <h2>Your Rating</h2>
          <StarRating rating={rating} onRate={handleRate} />
        </div>

        <div className="movie-user-block">
          <h2>Your Review</h2>
          {editing ? (
            <div className="review-form">
              <textarea
                className="review-textarea"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Write your thoughts on this film..."
                rows={5}
              />
              <div className="review-actions">
                <button className="btn" onClick={handleSaveReview}>Save Review</button>
                {savedReview && (
                  <button className="btn btn--secondary" onClick={() => { setReviewText(savedReview); setEditing(false); }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="review-display">
              <p className="review-text">{savedReview}</p>
              <div className="review-actions">
                <button className="btn btn--secondary" onClick={() => setEditing(true)}>Edit Review</button>
                <button className="btn btn--danger" onClick={handleDeleteReview}>Delete Review</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Movie;
