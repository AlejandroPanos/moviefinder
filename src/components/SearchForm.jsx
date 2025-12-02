import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { IoChevronDown, IoChevronBack, IoChevronForward } from "react-icons/io5";

import { fetchGenres, fetchFilteredMovies } from "../utils/http";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MovieGrid from "./MovieGrid";

const SearchForm = () => {
  // useRef()
  const searchRef = useRef();
  const genreRef = useRef();
  const ratingRef = useRef();

  // useState()
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    rating: 0,
    page: 1,
  });
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // useEffect() – debouncing (less API calls)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Filters query
  const filtersQuery = useQuery({
    queryKey: ["movies", "filtered", debouncedTerm, filters.genre, filters.rating, filters.page],
    queryFn: () =>
      fetchFilteredMovies({
        search: debouncedTerm,
        genre: filters.genre,
        rating: filters.rating,
        page: filters.page,
      }),
  });

  // Genres query
  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  // Handle form submision
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      search: searchRef.current.value,
      genre: genreRef.current.value,
      rating: ratingRef.current.value,
    };

    setFilters((prev) => ({ ...prev, formData }));
  };

  // Handle real-time updates for better UX
  const handleInputChange = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchRef.current.value,
      genre: genreRef.current.value,
      rating: ratingRef.current.value,
    }));
  };

  // Handle pagination
  const currentPage = filtersQuery?.data?.page;
  const lastPage = filtersQuery?.data?.totalPages;
  const firstPage = 1;

  const nextPage = () => {
    setFilters((prev) => {
      if (prev.page <= lastPage) {
        return { ...prev, page: prev.page + 1 };
      }
    });
  };

  const previousPage = () => {
    setFilters((prev) => {
      if (prev.page > firstPage) {
        return { ...prev, page: prev.page - 1 };
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          ref={searchRef}
          onChange={handleInputChange}
          type="text"
          name="search"
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white font-light border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500 hover:cursor-text"
          placeholder="Search movies..."
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 w-full sm:w-auto">
            {/* Genre select */}
            <div className="relative w-full sm:w-auto">
              <select
                ref={genreRef}
                onChange={handleInputChange}
                name="genre"
                disabled={genresQuery.isPending || genresQuery.isError}
                className="w-full sm:w-auto px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-800 font-light dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">
                  {genresQuery.isPending
                    ? "Loading genres..."
                    : genresQuery.isError
                    ? "Error loading genres"
                    : "All genres"}
                </option>
                {genresQuery?.data?.genres.map((genre) => {
                  return (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IoChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </div>

          {/* Min Rating slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-sm dark:text-white whitespace-nowrap">Min Rating:</label>
            <input
              ref={ratingRef}
              onChange={handleInputChange}
              name="rating"
              type="range"
              min="0"
              max="10"
              step="0.5"
              defaultValue={filters.rating}
              className="flex-1 sm:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="font-medium text-sm dark:text-white">{filters.rating}</span>
          </div>
        </div>
      </form>

      {filtersQuery.isPending && <Loading />}
      {filtersQuery.isError && <ErrorMessage />}
      {!filtersQuery.isPending &&
        !filtersQuery.isError &&
        filtersQuery.data.results.length === 0 && (
          <p className="md:text-lg text-gray-700 dark:text-gray-400 font-light">
            {`No films found for ${debouncedTerm}. Try with a new search or try changing your filters.`}
          </p>
        )}
      {!filtersQuery.isPending && !filtersQuery.isError && (
        <MovieGrid movies={filtersQuery?.data?.results} />
      )}

      {!filtersQuery.isPending && !filtersQuery.isError && filtersQuery.data.results.length > 0 && (
        <div className="w-full mx-auto flex items-center justify-center gap-2 sm:gap-4">
          <button
            disabled={currentPage === firstPage}
            onClick={previousPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-700 font-light text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <IoChevronBack className="w-5 h-5" />
            Previous
          </button>
          <button
            disabled={currentPage === lastPage}
            onClick={nextPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-700 font-light text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Next
            <IoChevronForward className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default SearchForm;
