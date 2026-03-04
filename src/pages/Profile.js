import { useState } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';

function Profile({ favorites, watched, toggleFavorite, toggleWatched }) {
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));
  const watchedMovies = movies.filter(m => watched.includes(m.id));

  const [savedBio, setSavedBio] = useState(() =>
    localStorage.getItem('bio') || ''
  );
  const [bioText, setBioText] = useState(savedBio);
  const [editingBio, setEditingBio] = useState(savedBio === '');

  const handleSaveBio = () => {
    localStorage.setItem('bio', bioText);
    setSavedBio(bioText);
    setEditingBio(false);
  };

  const handleDeleteBio = () => {
    localStorage.removeItem('bio');
    setSavedBio('');
    setBioText('');
    setEditingBio(true);
  };

  return (
    <main className="profile-page">
      <section className="profile-bio">
        <div className="profile-header">
          <div className="profile-avatar">UB</div>
          <div className="profile-identity">
            <h1 className="profile-heading">User Blue</h1>
            <p className="profile-subheading">Personal Film Library</p>
          </div>
        </div>

        <div className="profile-bio-section">
          <h2 className="profile-section-heading">Bio</h2>
          {editingBio ? (
            <div className="review-form">
              <textarea
                className="review-textarea"
                value={bioText}
                onChange={e => setBioText(e.target.value)}
                placeholder="Write a short bio..."
                rows={4}
              />
              <div className="review-actions">
                <button className="btn" onClick={handleSaveBio}>Save Bio</button>
                {savedBio && (
                  <button className="btn btn--secondary" onClick={() => { setBioText(savedBio); setEditingBio(false); }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="review-display">
              <p className="review-text">{savedBio}</p>
              <div className="review-actions">
                <button className="btn btn--secondary" onClick={() => setEditingBio(true)}>Edit Bio</button>
                <button className="btn btn--danger" onClick={handleDeleteBio}>Delete Bio</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="profile-section">
        <h2 className="profile-section-heading">Favorites ({favoriteMovies.length})</h2>
        {favoriteMovies.length === 0
          ? <p className="profile-empty">No favorites yet. Mark films you love from the Collections page.</p>
          : (
            <div className="movie-grid">
              {favoriteMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  isWatched={watched.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleWatched={toggleWatched}
                />
              ))}
            </div>
          )
        }
      </section>

      <section className="profile-section">
        <h2 className="profile-section-heading">Watched ({watchedMovies.length})</h2>
        {watchedMovies.length === 0
          ? <p className="profile-empty">No films marked as watched yet.</p>
          : (
            <div className="movie-grid">
              {watchedMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  isWatched={watched.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleWatched={toggleWatched}
                />
              ))}
            </div>
          )
        }
      </section>
    </main>
  );
}

export default Profile;
