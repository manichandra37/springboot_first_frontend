import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      genre,
      releaseYear: Number(releaseYear),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`Failed to add movie: ${response.status} ${errorText || response.statusText}`);
      }

      alert("Movie added 🎉");
      navigate("/"); // go back to movie list
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage = error.message || "Unknown error";
      alert(`Error adding movie 😭\n\n${errorMessage}\n\nCheck console for details.`);
    }
  };

  return (
    <div className="add-movie-form">
      <h2>Add Movie</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Release Year</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </div>

        {/* 🔥 THIS IS THE BUTTON YOU WERE MISSING */}
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
