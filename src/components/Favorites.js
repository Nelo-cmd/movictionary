import MovieCard from './MovieCard';

export default function Favorites({ favorites, onFavorite }) {
  return (
    <div className="movie-grid">
      {favorites.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onFavorite={onFavorite}
          isFavorited={true}
        />
      ))}
    </div>
  );
}
