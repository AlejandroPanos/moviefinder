import { createContext, useState, useEffect, useMemo } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.log("Error loading favorites:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.log("Error saving favorite:", error);
    }
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === movie.id);

      if (isAlreadyFavorite) {
        return prevFavorites;
      }

      return [...prevFavorites, movie];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const favoriteCount = favorites.length;

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      favoriteCount,
    }),
    [favorites]
  );

  return (
    <>
      <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
    </>
  );
};
