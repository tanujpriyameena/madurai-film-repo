import { useState, useMemo, useEffect } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';

const minYear = Math.min(...movies.map(m => m.year));
const maxYear = Math.max(...movies.map(m => m.year));

function Collections({ favorites, watched, toggleFavorite, toggleWatched }) {
  const [keyword, setKeyword] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [yearFrom, setYearFrom] = useState(minYear);
  const [yearTo, setYearTo] = useState(maxYear);
  const [sortBy, setSortBy] = useState('');
  const [ratings] = useState(() =>
    JSON.parse(localStorage.getItem('ratings') || '{}')
  );

  // Pass 1: filter by keyword + year only, normalising inverted ranges
  const byKeywordAndYear = useMemo(() => {
    const normalizedKeyword = keyword.trim().replace(/\s+/g, ' ').toLowerCase();
    const from = Math.min(Number(yearFrom) || minYear, Number(yearTo) || maxYear);
    const to   = Math.max(Number(yearFrom) || minYear, Number(yearTo) || maxYear);
    return movies.filter(m => {
      const matchesKeyword =
        normalizedKeyword === '' ||
        m.title.toLowerCase().includes(normalizedKeyword) ||
        m.description.toLowerCase().includes(normalizedKeyword);
      const matchesYear = m.year >= from && m.year <= to;
      return matchesKeyword && matchesYear;
    });
  }, [keyword, yearFrom, yearTo]);

  // Derive available genres from the keyword+year subset
  const availableGenres = useMemo(() =>
    [...new Set(byKeywordAndYear.flatMap(m => m.genres))].sort(),
    [byKeywordAndYear]
  );

  // Reset selected genre if it no longer exists in the filtered subset
  useEffect(() => {
    if (selectedGenre && !availableGenres.includes(selectedGenre)) {
      setSelectedGenre('');
    }
  }, [availableGenres, selectedGenre]);

  // Pass 2: apply genre filter and sort
  const filtered = useMemo(() => {
    const results = byKeywordAndYear.filter(m =>
      selectedGenre === '' || m.genres.includes(selectedGenre)
    );
    if (sortBy === 'rating-desc') {
      return [...results].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));
    }
    if (sortBy === 'rating-asc') {
      return [...results].sort((a, b) => (ratings[a.id] || 0) - (ratings[b.id] || 0));
    }
    return results;
  }, [byKeywordAndYear, selectedGenre, sortBy, ratings]);

  return (
    <main className="collections-page">
      <h1 className="collections-heading">Collections</h1>

      <div className="filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Search by title or keyword..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <select
          className="filter-select"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {availableGenres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="">Sort: Default</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
        </select>
        <div className="filter-year">
          <label>Year</label>
          <input
            type="number"
            className="filter-input filter-input--year"
            value={yearFrom}
            min={minYear}
            max={maxYear}
            onChange={e => setYearFrom(e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            className="filter-input filter-input--year"
            value={yearTo}
            min={minYear}
            max={maxYear}
            onChange={e => setYearTo(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0
        ? <p className="no-results">No films match your filters.</p>
        : (
          <div className="movie-grid">
            {filtered.map(movie => (
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
    </main>
  );
}

export default Collections;
