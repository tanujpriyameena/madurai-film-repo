import { useState, useEffect } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/AuthContext';
import { getUserData, updateUserData } from '../services/firestore';

function Profile({ favorites, watched, watchlist, toggleFavorite, toggleWatched, toggleWatchlist, baseMode, toggleBaseMode, animatedMode, toggleAnimatedMode }) {
  const { currentUser, updateDisplayName } = useAuth();
  const [profileSearch, setProfileSearch] = useState('');

  const searchFilter = (list) => {
    const q = profileSearch.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!q) return list;
    return list.filter(m => m.title.toLowerCase().includes(q));
  };

  const favoriteMovies = searchFilter(movies.filter(m => favorites.includes(m.id)));
  const watchedMovies = searchFilter(movies.filter(m => watched.includes(m.id)));
  const watchlistMovies = searchFilter(movies.filter(m => watchlist.includes(m.id)));

  const displayName = currentUser?.displayName || '';
  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const [editingName, setEditingName] = useState(false);
  const [nameText, setNameText] = useState(displayName);
  const [nameError, setNameError] = useState('');

  const handleSaveName = async () => {
    if (!nameText.trim()) return setNameError('Name cannot be empty.');
    setNameError('');
    await updateDisplayName(nameText.trim());
    setEditingName(false);
  };

  const [savedBio, setSavedBio] = useState('');
  const [bioText, setBioText] = useState('');
  const [editingBio, setEditingBio] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUserData(currentUser.uid).then(data => {
      const bio = data.bio || '';
      setSavedBio(bio);
      setBioText(bio);
      setEditingBio(bio === '');
    });
  }, [currentUser]);

  const handleSaveBio = async () => {
    await updateUserData(currentUser.uid, { bio: bioText });
    setSavedBio(bioText);
    setEditingBio(false);
  };

  const handleDeleteBio = async () => {
    await updateUserData(currentUser.uid, { bio: '' });
    setSavedBio('');
    setBioText('');
    setEditingBio(true);
  };

  return (
    <main className="profile-page">
      <section className="profile-bio">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-identity">
            {editingName ? (
              <div className="profile-name-edit">
                <input
                  className="auth-input profile-name-input"
                  value={nameText}
                  onChange={e => setNameText(e.target.value)}
                  placeholder="Full name"
                />
                {nameError && <p className="auth-error">{nameError}</p>}
                <div className="review-actions">
                  <button className="btn" onClick={handleSaveName}>Save</button>
                  <button className="btn btn--secondary" onClick={() => { setNameText(displayName); setEditingName(false); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="profile-heading">
                  {displayName || 'No name set'}
                </h1>
                <p className="profile-subheading">Personal Film Library</p>
                <button className="profile-edit-name-btn" onClick={() => setEditingName(true)}>
                  Edit name
                </button>
              </>
            )}
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

      <section className="profile-section profile-preferences">
        <h2 className="profile-section-heading">Display Preferences</h2>
        <div className="preference-row">
          <div className="preference-info">
            <span className="preference-label">Base Mode</span>
            <span className="preference-desc">Simple white background, plain styling.</span>
          </div>
          <button
            className={`preference-toggle ${baseMode ? 'preference-toggle--on' : ''}`}
            onClick={toggleBaseMode}
          >
            {baseMode ? 'On' : 'Off'}
          </button>
        </div>
        <div className="preference-row">
          <div className="preference-info">
            <span className="preference-label">Animated Mode</span>
            <span className="preference-desc">Shine on headers, pop effect, star animations </span>
          </div>
          <button
            className={`preference-toggle ${animatedMode ? 'preference-toggle--on' : ''}`}
            onClick={toggleAnimatedMode}
          >
            {animatedMode ? 'On' : 'Off'}
          </button>
        </div>
      </section>

      <div className="profile-search-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="Search your films..."
          value={profileSearch}
          onChange={e => setProfileSearch(e.target.value)}
        />
      </div>

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
                  isWatchlisted={watchlist.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleWatched={toggleWatched}
                  onToggleWatchlist={toggleWatchlist}
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
                  isWatchlisted={watchlist.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleWatched={toggleWatched}
                  onToggleWatchlist={toggleWatchlist}
                />
              ))}
            </div>
          )
        }
      </section>

      <section className="profile-section">
        <h2 className="profile-section-heading">Watchlist ({watchlistMovies.length})</h2>
        {watchlistMovies.length === 0
          ? <p className="profile-empty">No films on your watchlist yet. Click the ★ on any film card to add it.</p>
          : (
            <div className="movie-grid">
              {watchlistMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  isWatched={watched.includes(movie.id)}
                  isWatchlisted={watchlist.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleWatched={toggleWatched}
                  onToggleWatchlist={toggleWatchlist}
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
