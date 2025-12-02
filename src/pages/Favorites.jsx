import PageHeader from "../components/PageHeader";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <div className="mx-auto p-4 my-4">
        <div className="flex flex-col items-start gap-6">
          <PageHeader title={"Favorites"} desc={"Your collection of favorite movies"} />
          {favorites.length === 0 && <EmptyState />}
          {favorites.length > 0 && <MovieGrid movies={favorites} />}
        </div>
      </div>
    </>
  );
};

export default Favorites;
