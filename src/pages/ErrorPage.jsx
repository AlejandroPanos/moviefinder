import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="mx-auto p-4 h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold dark:text-white mb-4">Oops!</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-8">
            Something went wrong.
          </p>
          <Link
            to={"/"}
            className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue-500 dark:bg-blue-700 hover:opacity-90 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
