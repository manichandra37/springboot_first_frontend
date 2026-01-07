import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import AddReviewForm from "./AddReviewForm";
import { API_BASE_URL } from "../api";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch movie details
  useEffect(() => {
    fetch(`${API_BASE_URL}/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Movie fetch error:", err));
  }, [id]);

  // Fetch reviews for this movie
  const fetchReviews = useCallback(() => {
    fetch(`${API_BASE_URL}/reviews/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Review fetch error:", err));
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className="details-container">
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-info">🎭 Genre: {movie.genre}</p>
      <p className="movie-info">📅 Release Year: {movie.releaseYear}</p>
  
      <hr />
  
      <h3 className="section-title">Reviews</h3>
  
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="rating">⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
  
      {/* Add Review Form */}
      <AddReviewForm movieId={movie.movieId} onReviewAdded={fetchReviews} />
    </div>
  );  
}

export default MovieDetails;
