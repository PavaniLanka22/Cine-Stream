/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  /* LOAD FROM LOCAL STORAGE */
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  /* SYNC TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  /* TOGGLE FAVORITE */
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {

      const exists = prev.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...prev, movie];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/* CUSTOM HOOK */
export function useFavorites() {
  return useContext(FavoritesContext);
}