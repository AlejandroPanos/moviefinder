import { useEffect, useState } from "react";

import { fetchPopularMovies } from "../utils/http";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieGrid from "../components/MovieGrid";
import PageHeader from "../components/PageHeader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <div className="mx-auto p-4 my-4">
        <div className="flex flex-col items-start gap-10">
          <PageHeader
            title={"Popular Movies"}
            desc={"Here is a collection of the current 20 most popular movies"}
          />

          {loading && <Loading />}
          {error && <ErrorMessage error={error.message} />}
          {!loading && !error && <MovieGrid movies={movies} />}
        </div>
      </div>
    </>
  );
};

export default Home;
