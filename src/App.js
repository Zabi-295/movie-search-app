import React, { useState } from "react";
import "./index.css";

const API_KEY = "thewdb"; // Agar koi problem aaye to apna OMDB API key use karo

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No results");
      }
    } catch (err) {
      setError("Network error");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") searchMovies();
  };

  return (
    <div className="ms-page">
      <div className="ms-card">
        <header className="ms-header">
          <h1>🎬 Movie Search</h1>
       
        </header>

        <div className="ms-controls">
          <input
            className="ms-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type movie name e.g. Batman, Inception..."
            aria-label="Search movies"
          />
          <button className="ms-btn" onClick={searchMovies} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <div className="ms-error">{error}</div>}

        <div className="ms-grid">
          {movies.length === 0 && !loading && !error && (
            <div className="ms-empty">Try searching for a movie above</div>
          )}

          {movies.map((m) => (
            <div key={m.imdbID} className="ms-card-item">
              <div className="ms-poster-wrap">
                <img
                  src={m.Poster !== "N/A" ? m.Poster : "/no-poster.png"}
                  alt={m.Title}
                  className="ms-poster"
                  onError={(e) => (e.currentTarget.src = "/no-poster.png")}
                />
              </div>
              <div className="ms-info">
                <h3 className="ms-title">{m.Title}</h3>
                <p className="ms-year">{m.Year}</p>
                <div className="ms-badge">{m.Type}</div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

export default App;

