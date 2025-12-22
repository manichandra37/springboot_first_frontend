import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMovies = () => {
    fetch("https://springboot-first.onrender.com/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        // Fetch reviews for all movies
        fetchAllMovieRatings(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  };

  const fetchAllMovieRatings = async (moviesList) => {
    const ratings = {};
    
    // Fetch reviews for each movie
    const reviewPromises = moviesList.map(async (movie) => {
      try {
        const response = await fetch(
          `https://springboot-first.onrender.com/reviews/movie/${movie.movieId}`
        );
        const reviews = await response.json();
        
        if (reviews && reviews.length > 0) {
          const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
          const average = sum / reviews.length;
          ratings[movie.movieId] = average.toFixed(1);
        } else {
          ratings[movie.movieId] = null;
        }
      } catch (err) {
        console.error(`Error fetching reviews for movie ${movie.movieId}:`, err);
        ratings[movie.movieId] = null;
      }
    });

    await Promise.all(reviewPromises);
    setMovieRatings(ratings);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Refresh movies when navigating back to home
  useEffect(() => {
    if (location.pathname === "/") {
      fetchMovies();
    }
  }, [location.pathname]);

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
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
        {filteredMovies.map((movie) => {
          const averageRating = movieRatings[movie.movieId];
          return (
            <div
              key={movie.movieId}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.movieId}`)}
            >
              <div className="movie-card-header">
                <h3>{movie.title}</h3>
                {averageRating && (
                  <span className="movie-rating">
                    ⭐ {averageRating}
                  </span>
                )}
              </div>
              <p>{movie.genre} • {movie.releaseYear}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
