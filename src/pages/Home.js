import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Madurai Film Library</h1>
          <p className="hero-tagline">Discover, track, and celebrate the art of Tamil cinema.</p>
          <Link to="/collections" className="hero-btn">Browse the Collection</Link>
        </div>
      </section>

      <section className="about">
        <h2>About This Library</h2>
        <p>
          The Madurai Film Library is a personal archive dedicated to the rich tradition of Tamil
          film — from the classic dramas of the mid-twentieth century to the bold independent voices
          of today. Named after one of Tamil Nadu's oldest and most storied cities, this library
          exists as a space to explore, remember, and honor the films that have shaped a culture.
        </p>
        <p>
          Whether you are a longtime fan or a curious newcomer, you will find a curated selection
          of films spanning decades, genres, and directors. Every film in this collection has been
          chosen for its artistic merit, cultural significance, or enduring popularity.
        </p>
      </section>

      <section className="features">
        <h2>What You Can Do</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Browse</h3>
            <p>Explore the full collection by genre, year, or keyword. Find something new or revisit an old favorite.</p>
          </div>
          <div className="feature-card">
            <h3>Save Favorites</h3>
            <p>Mark films you love and keep them on your profile for easy access anytime.</p>
          </div>
          <div className="feature-card">
            <h3>Track Watched Films</h3>
            <p>Keep a personal log of every film you have seen. Mark and unmark at any time.</p>
          </div>
          <div className="feature-card">
            <h3>Rate &amp; Review</h3>
            <p>Leave a star rating and a written review on any film. Your notes are saved locally to your device.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
