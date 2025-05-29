import MovieCard from './MovieCard';

export default function MovieList({ movies, onFavorite, favorites }) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onFavorite={onFavorite}
          isFavorited={favorites.some(fav => fav.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
}
