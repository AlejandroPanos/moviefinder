import { useNavigate } from "react-router";

import { IoHeartOutline, IoHeartDislikeOutline } from "react-icons/io5";
import { useFavorites } from "../hooks/useFavorites";

const DisplayMovie = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-auto my-4">
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: movie?.backdrop_path ? (
              `url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`
            ) : (
              <div>No backdrop available</div>
            ),
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-gray-50/30 to-gray-50 dark:from-gray-900/30 dark:to-gray-900"></div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-4 text-blue-500 dark:text-blue-600 hover:opacity-90 hover:cursor-pointer text-lg z-10 transition-all duration-200"
          >
            ← Back to Movies
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-7 items-center gap-8">
          <div className="col-start-1 col-end-7 lg:col-end-3">
            <img
              src={
                movie?.poster_path ? (
                  `https://image.tmdb.org/t/p/w342${movie?.poster_path}`
                ) : (
                  <div>No poster available</div>
                )
              }
              alt={movie?.title}
              className="h-96 lg:h-full w-full object-cover rounded-lg shadow-lg/40"
            />
          </div>

          <div className="col-span-5 justify-items-stretch">
            <p className="text-blue-500 dark:text-blue-600 italic text-lg mb-4">
              {movie?.tagline || "No movie tagline available"}
            </p>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-black dark:text-white">
              {movie?.title}
            </h1>

            <div className="flex items-center gap-3 sm:gap-6 text-md sm:text-lg mb-8 text-gray-700 dark:text-white">
              <span>📅 {movie?.release_date.split("-")[0]}</span>
              <span>⭐ {movie?.vote_average.toFixed(2)}/10</span>
              <span>⏱️ {movie?.runtime}m</span>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-700 dark:text-gray-400 uppercase text-sm font-semibold mb-3">
                Genres
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {movie?.genres.map((g) => {
                  return (
                    <span
                      key={g.id}
                      className="px-4 py-2 text-center text-gray-700 dark:text-white bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-full text-sm"
                    >
                      {g.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-700 dark:text-gray-400 uppercase text-sm font-semibold mb-3">
                Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-md sm:text-lg">
                {movie?.overview}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => addFavorite(movie)}
                disabled={isFavorite(movie.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-700 font-light text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <IoHeartOutline className="w-5 h-5" />
                Add to favorites
              </button>
              <button
                onClick={() => removeFavorite(movie.id)}
                disabled={!isFavorite(movie.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-700 font-light text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <IoHeartDislikeOutline className="w-5 h-5" />
                Remove from favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMovie;
