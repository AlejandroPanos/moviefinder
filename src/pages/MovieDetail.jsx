import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { fetchMovie } from "../utils/http";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import DisplayMovie from "../components/DisplayMovie";

const MovieDetail = () => {
  const params = useParams();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovie(params.id);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [params.id]);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage error={error.message} />}
      {!loading && !error && <DisplayMovie movie={movie} />}
    </>
  );
};

export default MovieDetail;
