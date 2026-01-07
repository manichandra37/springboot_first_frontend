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
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((err) => console.error("Movie fetch error:", err));
  }, [id]);

  // Fetch reviews for this movie
  const fetchReviews = useCallback(() => {
    fetch(`${API_BASE_URL}/reviews/movie/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Review fetch error:", err));
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!movie) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="movie-header">
        <h2 className="movie-title">{movie.title}</h2>
        <div className="movie-badge">
          <span className="badge-item">🎭 {movie.genre}</span>
          <span className="badge-item">📅 {movie.releaseYear}</span>
        </div>
      </div>
  
      <div className="divider"></div>
  
      <h3 className="section-title">Reviews</h3>
  
      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews found. Be the first to review!</p>
        ) : (
          reviews.map((review) => {
            const formatDate = (dateString) => {
              if (!dateString) return "Unknown date";
              try {
                const date = new Date(dateString);
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              } catch {
                return dateString;
              }
            };

            return (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-rating">
                    <span className="star-icon">⭐</span>
                    <span className="rating-value">{review.rating}</span>
                  </div>
                  <div className="review-meta">
                    {review.createdBy && (
                      <span className="review-author">👤 {review.createdBy}</span>
                    )}
                    {(review.createdAt || review.createdTime || review.timestamp) && (
                      <span className="review-date">
                        🕒 {formatDate(review.createdAt || review.createdTime || review.timestamp)}
                      </span>
                    )}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            );
          })
        )}
      </div>
  
      {/* Add Review Form */}
      <AddReviewForm movieId={movie.movieId} onReviewAdded={fetchReviews} />
    </div>
  );  
}

export default MovieDetails;
