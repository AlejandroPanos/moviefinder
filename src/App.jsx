import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "movies/:id", element: <MovieDetail /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </>
  );
};

export default App;
