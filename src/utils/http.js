import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchMovie = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchFilteredMovies = async ({ search, genre, rating, page }) => {
  try {
    // Search endpoint
    if (search && search.trim()) {
      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "en-US",
        page: page || 1,
        query: search,
      });
      const url = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
      const response = await axios.get(url);
      let results = response.data.results;

      if (genre) {
        results = results.filter((movie) => movie.genre_ids.includes(parseInt(genre)));
      }

      if (rating) {
        results = results.filter((movie) => movie.vote_average >= parseFloat(rating));
      }

      return {
        results,
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
      };
    }

    // Filters endpoint
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: "en-US",
      page: page || 1,
    });

    if (genre) {
      params.append("with_genres", genre);
    }

    if (rating) {
      params.append("vote_average.gte", rating);
    }

    const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
    const response = await axios.get(url);
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (error) {
    console.log("Error fetching movies", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
