import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import movies from '../data/movies';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { getUserRating, setRating, setReview, deleteReview, voteReview } from '../services/firestore';

function Movie({ favorites, watched, toggleFavorite, toggleWatched }) {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const movie = movies.find(m => m.id === Number(id));

  const [rating, setRatingState] = useState(0);
  const [savedReview, setSavedReview] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [editing, setEditing] = useState(true);
  const [publicReviews, setPublicReviews] = useState([]);
  const [allRatings, setAllRatings] = useState([]);

  // Load user's own rating
  useEffect(() => {
    if (!currentUser || !movie) return;
    getUserRating(id, currentUser.uid).then(val => setRatingState(val));
  }, [currentUser, id, movie]);

  // Real-time listener for all public reviews
  useEffect(() => {
    if (!movie) return;
    const unsubscribe = onSnapshot(
      collection(db, 'movieReviews', id, 'reviews'),
      (snap) => {
        const reviews = snap.docs
          .map(d => ({ uid: d.id, ...d.data() }))
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setPublicReviews(reviews);
        if (currentUser) {
          const mine = reviews.find(r => r.uid === currentUser.uid);
          if (mine) {
            setSavedReview(mine.text);
            setReviewText(mine.text);
            setEditing(false);
          } else {
            setSavedReview('');
            setReviewText('');
            setEditing(true);
          }
        }
      }
    );
    return unsubscribe;
  }, [currentUser, id, movie]);

  // Real-time listener for all ratings (for average)
  useEffect(() => {
    if (!movie) return;
    const unsubscribe = onSnapshot(
      collection(db, 'movieRatings', id, 'ratings'),
      (snap) => setAllRatings(snap.docs.map(d => d.data().value))
    );
    return unsubscribe;
  }, [id, movie]);

  const avgRating = allRatings.length > 0
    ? Math.round(allRatings.reduce((a, b) => a + b, 0) / allRatings.length)
    : 0;

  if (!movie) {
    return (
      <main className="page-placeholder">
        <h1>Film not found</h1>
        <p>This film doesn't exist in the collection. <Link to="/collections">Back to Collections</Link></p>
      </main>
    );
  }

  const handleRate = async (star) => {
    setRatingState(star);
    await setRating(id, currentUser.uid, star);
  };

  const handleSaveReview = async () => {
    await setReview(id, currentUser.uid, reviewText, currentUser.displayName);
  };

  const handleDeleteReview = async () => {
    await deleteReview(id, currentUser.uid);
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
          {avgRating > 0 && (
            <p className="movie-avg-rating">
              {'★'.repeat(avgRating)}{'☆'.repeat(5 - avgRating)}
              <span className="avg-rating-label"> {avgRating}/5 · {allRatings.length} {allRatings.length === 1 ? 'rating' : 'ratings'}</span>
            </p>
          )}
          <p className="movie-detail-director">Directed by <strong>{movie.director}</strong></p>
          <p className="movie-detail-cast"><span className="detail-label">Cast</span> {movie.cast.join(', ')}</p>
          <p className="movie-detail-description">{movie.description}</p>
        </div>
      </div>

      {currentUser ? (
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
      ) : (
        <p className="auth-gate-msg">
          <Link to="/login">Log in</Link> to favorite, track, rate, and review this film.
        </p>
      )}

      {currentUser && (
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
      )}

      <section className="community-reviews">
        <h2 className="movie-user-block-heading">Community Reviews</h2>
        {publicReviews.length === 0
          ? <p className="profile-empty">No reviews yet for this film. Be the first!</p>
          : publicReviews.map(review => {
            const likes = review.likes || [];
            const dislikes = review.dislikes || [];
            const userLiked = currentUser && likes.includes(currentUser.uid);
            const userDisliked = currentUser && dislikes.includes(currentUser.uid);

            const handleVote = (voteType) => {
              if (!currentUser) return;
              const current = userLiked ? 'up' : userDisliked ? 'down' : null;
              voteReview(id, review.uid, currentUser.uid, current === voteType ? null : voteType);
            };

            return (
              <div key={review.uid} className="review-item">
                <p className="review-author">{review.displayName}</p>
                <p className="review-item-text">{review.text}</p>
                <div className="review-votes">
                  <button
                    className={`vote-btn ${userLiked ? 'vote-btn--active vote-btn--up' : ''}`}
                    onClick={() => handleVote('up')}
                    title={currentUser ? 'Helpful' : 'Log in to vote'}
                    disabled={!currentUser}
                  >
                    👍{likes.length > 0 && <span className="vote-count">{likes.length}</span>}
                  </button>
                  <button
                    className={`vote-btn ${userDisliked ? 'vote-btn--active vote-btn--down' : ''}`}
                    onClick={() => handleVote('down')}
                    title={currentUser ? 'Not helpful' : 'Log in to vote'}
                    disabled={!currentUser}
                  >
                    👎{dislikes.length > 0 && <span className="vote-count">{dislikes.length}</span>}
                  </button>
                </div>
              </div>
            );
          })
        }
      </section>
    </main>
  );
}

export default Movie;
