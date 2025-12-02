import { Link } from "react-router";

const EmptyState = () => {
  return (
    <>
      <div className="w-full mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 flex flex-col items-center justify-center gap-4 shadow-lg">
        <p className="md:text-lg text-gray-700 dark:text-gray-400 font-light">
          No favorites yet...
        </p>
        <Link
          to="/search"
          className="px-4 py-2 md:px-6 md:py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-light transition-colors"
        >
          Search Movies
        </Link>
      </div>
    </>
  );
};

export default EmptyState;
