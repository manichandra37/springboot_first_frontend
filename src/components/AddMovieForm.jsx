import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:8080/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      {/* Add Movie */}
      <AddMovieForm onMovieAdded={fetchMovies} />

      {/* Search */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Movie Cards */}
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div
            key={movie.movieId}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.movieId}`)}
          >
            <h3>{movie.title}</h3>
            <p>
              {movie.genre} • {movie.releaseYear}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
