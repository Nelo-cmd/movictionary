import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';

const API_KEY = "e54d5943";

// Example popular movies to show on home screen (you can customize)
const POPULAR_SEARCHES = ['Batman', 'Star Wars', 'Avengers', 'Matrix', 'Inception'];

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'favorites'
  const [loading, setLoading] = useState(false);

  // Fetch movies based on search query or show popular movies if empty
  useEffect(() => {
    let searchTerm = query.trim();
    if (searchTerm.length > 2) {
      fetchMovies(searchTerm);
    } else if (searchTerm === '') {
      // Show popular movies (fetch first popular movie's results)
      fetchPopularMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  // Fetch movies from API
  const fetchMovies = (searchTerm) => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        if (data.Search) setMovies(data.Search);
        else setMovies([]);
      })
      .finally(() => setLoading(false));
  };

  // Fetch popular movies (fetch results of first popular search for simplicity)
  const fetchPopularMovies = () => {
    if (POPULAR_SEARCHES.length === 0) {
      setMovies([]);
      return;
    }
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${POPULAR_SEARCHES[0]}`)
      .then(res => res.json())
      .then(data => {
        if (data.Search) setMovies(data.Search);
        else setMovies([]);
      })
      .finally(() => setLoading(false));
  };

  // Toggle favorite movie add/remove
  const handleToggleFavorite = (movie) => {
    if (favorites.find(fav => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="app-container">
      <h1>MOVICTIONARY</h1>

      <nav className="nav-bar">
        <button
          className={activeTab === 'search' ? 'active-tab' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
        <button
          className={activeTab === 'favorites' ? 'active-tab' : ''}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites {favorites.length > 0 ? `(${favorites.length})` : ''}
        </button>
      </nav>

      {activeTab === 'search' && (
        <>
          <SearchBar onSearch={setQuery} />
          {loading && <p>Loading...</p>}
          {!loading && movies.length === 0 && <p>No results found.</p>}
          {!loading && movies.length > 0 && (
            <>
              <h2>Results:</h2>
              <MovieList 
                movies={movies} 
                onFavorite={handleToggleFavorite} 
                favorites={favorites} 
              />
            </>
          )}
        </>
      )}

      {activeTab === 'favorites' && (
        <>
          <h2>Your Favorites:</h2>
          {favorites.length === 0 ? (
            <p>No favorites yet. Add some from Search!</p>
          ) : (
            <Favorites favorites={favorites} onFavorite={handleToggleFavorite} />
          )}
        </>
      )}
    </div>
  );
}
