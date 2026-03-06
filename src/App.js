import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Profile from './pages/Profile';
import Movie from './pages/Movie';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { getUserData, updateUserData } from './services/firestore';
import './App.css';

function AppContent() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [baseMode, setBaseMode] = useState(false);
  const [animatedMode, setAnimatedMode] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      setWatched([]);
      setWatchlist([]);
      setBaseMode(false);
      setAnimatedMode(false);
      return;
    }
    getUserData(currentUser.uid).then(data => {
      setFavorites(data.favorites || []);
      setWatched(data.watched || []);
      setWatchlist(data.watchlist || []);
      setBaseMode(data.baseMode || false);
      setAnimatedMode(data.animatedMode || false);
    });
  }, [currentUser]);

  useEffect(() => {
    document.body.classList.toggle('theme-base', baseMode);
  }, [baseMode]);

  useEffect(() => {
    document.body.classList.toggle('theme-animated', animatedMode);
  }, [animatedMode]);

  const toggleBaseMode = () => {
    if (!currentUser) return;
    setBaseMode(prev => {
      const next = !prev;
      updateUserData(currentUser.uid, { baseMode: next });
      return next;
    });
  };

  const toggleAnimatedMode = () => {
    if (!currentUser) return;
    setAnimatedMode(prev => {
      const next = !prev;
      updateUserData(currentUser.uid, { animatedMode: next });
      return next;
    });
  };

  const toggleWatchlist = (id) => {
    if (!currentUser) return;
    setWatchlist(prev => {
      const updated = prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id];
      updateUserData(currentUser.uid, { watchlist: updated });
      return updated;
    });
  };

  const toggleFavorite = (id) => {
    if (!currentUser) return;
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      updateUserData(currentUser.uid, { favorites: updated });
      return updated;
    });
  };

  const toggleWatched = (id) => {
    if (!currentUser) return;
    setWatched(prev => {
      const updated = prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id];
      updateUserData(currentUser.uid, { watched: updated });
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={
          <Collections
            favorites={favorites}
            watched={watched}
            watchlist={watchlist}
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
            toggleWatchlist={toggleWatchlist}
          />
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile
              favorites={favorites}
              watched={watched}
              watchlist={watchlist}
              toggleFavorite={toggleFavorite}
              toggleWatched={toggleWatched}
              toggleWatchlist={toggleWatchlist}
              baseMode={baseMode}
              toggleBaseMode={toggleBaseMode}
              animatedMode={animatedMode}
              toggleAnimatedMode={toggleAnimatedMode}
            />
          </ProtectedRoute>
        } />
        <Route path="/movie/:id" element={
          <Movie
            favorites={favorites}
            watched={watched}
            watchlist={watchlist}
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
            toggleWatchlist={toggleWatchlist}
          />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
