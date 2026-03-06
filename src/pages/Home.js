import { Link } from 'react-router-dom';
import movies from '../data/movies';

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Madurai Film Library</h1>
          <p className="hero-tagline">Welcome to the Madurai Film Library, my midterm project!</p>
          <Link to="/collections" className="hero-btn">Browse the Collection</Link>
        </div>
      </section>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...movies, ...movies].map((movie, i) => (
            <div key={i} className="marquee-poster">
              {movie.posterUrl
                ? <img src={movie.posterUrl} alt={movie.title} />
                : <div className="marquee-placeholder">{movie.title}</div>
              }
            </div>
          ))}
        </div>
      </div>

      <section className="about">
        <h2>About This Library</h2>
        <p>
          The Madurai Film Library, centered in Tamil Nadu, India, is dedicated to the cinema of the world. It is dedicated to help users track popular movies, classics, and keep track of the films they like, and plan to see. Adding on, with each iteration, we are constantly expanding our collections, and making it an enjoyable experience for all.
        </p>
        <p>
          Whether you are a longtime fan or a curious newcomer, you will find a curated selection
          of films spanning different eras, genres, and directors. Every film in this collection has been
          chosen for its artistic merit, cultural significance, or enduring popularity.
        </p>
        <p><strong>Please ensure to log in, you can see some preference options there!</strong></p>
      </section>

      <section className="features">
        <h2>What You Can Do</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Browse</h3>
            <p>Explore the full collection by genre, rating, year, or keyword. Find something new or revisit an old favorite.</p>
          </div>
          <div className="feature-card">
            <h3>Save Favorites</h3>
            <p>Mark films you love and keep them on your profile for easy access anytime. You can even have a watchlist by starring films you like!</p>
          </div>
          <div className="feature-card">
            <h3>Track Watched Films</h3>
            <p>Keep a personal log of every film you have seen. Mark and unmark at any time.</p>
          </div>
          <div className="feature-card">
            <h3>Rate &amp; Review</h3>
            <p>Leave a star rating and a written review on any film. Others will be able to see your reviews!</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
