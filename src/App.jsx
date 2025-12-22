import { Routes, Route, useNavigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovieForm from "./components/AddMovieForm";

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>🎬 Movie Review App</h1>
        <p className="subtitle">
          A simple full-stack project built with Spring Boot & React
        </p>

        <button
          className="add-movie-btn"
          onClick={() => navigate("/add-movie")}
        >
          ➕ Add Movie
        </button>

        <MovieList />
      </div>

      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<p style={{ color: '#b3b3b3', fontSize: '18px' }}>Select a movie to begin</p>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
