import { useState, useEffect } from 'react';

export default function MovieCard({ movie, onFavorite, isFavorited }) {
  const [fav, setFav] = useState(isFavorited);

  useEffect(() => {
    setFav(isFavorited);
  }, [isFavorited]);

  const handleClick = () => {
    setFav(!fav);
    onFavorite(movie);
  };

  return (
    <div className="movie-card">
      <button
        className={`favorite-star ${fav ? 'favorited' : ''}`}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        onClick={handleClick}
      >
        ★
      </button>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/270x400?text=No+Image'}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
    </div>
  );
}
