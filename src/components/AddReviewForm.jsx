import { useState } from "react";
import { API_BASE_URL } from "../api";

function AddReviewForm({ movieId, onReviewAdded }) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      movieId: movieId,
      rating: Number(rating),
      comment: comment
    };

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        alert("Review added! 🎉");
        setRating("");
        setComment("");
        onReviewAdded(); // reload reviews
      } else {
        alert("Failed to add review 😭");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review 😭");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="section-title">Add a Review</h3>
  
      <div className="form-group">
        <label>Rating (1–5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
  
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
  
      <button type="submit">Submit Review</button>
    </form>
  );  
}

export default AddReviewForm;
