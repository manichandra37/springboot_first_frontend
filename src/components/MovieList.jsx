import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://springboot-first.onrender.com/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div
            key={movie.movieId}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.movieId}`)}
          >
            <h3>{movie.title}</h3>
            <p>{movie.genre} • {movie.releaseYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
