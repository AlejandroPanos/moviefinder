import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  return (
    <>
      <Link
        to={`/movies/${movie.id}`}
        key={movie.id}
        className="relative bg-transparent rounded-lg overflow-hidden hover:scale-105 transition-all duration-200"
      >
        <span className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full z-10">
          ⭐ {movie.vote_average.toFixed(2)}
        </span>

        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.original_title}
            className="w-full rounded-lg h-88 object-cover"
          />
        ) : (
          <div className="w-full h-88 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No poster available</span>
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold dark:text-white mb-1">{movie.original_title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {movie.release_date.split("-")[0]}
          </p>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
