import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch movie details
  useEffect(() => {
    fetch(`http://localhost:8080/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Movie fetch error:", err));
  }, [id]);

  // Fetch reviews for this movie
  const fetchReviews = () => {
    fetch(`http://localhost:8080/reviews/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Review fetch error:", err));
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

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
