import { useParams } from 'react-router-dom';

function Movie() {
  const { id } = useParams();

  return (
    <main className="page-placeholder">
      <h1>Movie #{id}</h1>
      <p>Individual movie details, ratings, and reviews will be built here in Phase 3.</p>
    </main>
  );
}

export default Movie;
