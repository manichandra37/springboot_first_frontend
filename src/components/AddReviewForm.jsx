import { useState } from "react";
import { API_BASE_URL } from "../api";

function AddReviewForm({ movieId, onReviewAdded }) {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      movieId: movieId,
      rating: Number(rating),
      comment: comment,
      reviewerName: reviewerName || "Anonymous"
    };

    try {
      console.log("Sending review data:", reviewData); // Debug: see what we're sending
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });
      
      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log("Backend response:", responseData); // Debug: see what backend returns
        } catch (e) {
          // Backend might not return JSON
          console.log("Backend response (no JSON):", response.status);
        }
        alert("Review added! 🎉");
        setReviewerName("");
        setRating("");
        setComment("");
        onReviewAdded(); // reload reviews
        
        // Notify MovieList to refresh ratings
        window.dispatchEvent(new CustomEvent('reviewAdded', { 
          detail: { movieId: movieId } 
        }));
      } else {
        const errorData = await response.text();
        console.error("Backend error:", errorData);
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
        <label>Your Name:</label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

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
