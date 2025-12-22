import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("https://springboot-first.onrender.com/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      alert("Movie added 🎉");
      navigate("/"); // go back to movie list
    } catch (error) {
      console.error(error);
      alert("Error adding movie 😭");
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
