import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Profile from './pages/Profile';
import Movie from './pages/Movie';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem('watched') || '[]')
  );

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWatched = (id) => {
    setWatched(prev => {
      const updated = prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id];
      localStorage.setItem('watched', JSON.stringify(updated));
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
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
          />
        } />
        <Route path="/profile" element={
          <Profile
            favorites={favorites}
            watched={watched}
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
          />
        } />
        <Route path="/movie/:id" element={
          <Movie
            favorites={favorites}
            watched={watched}
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
