import { useState } from "react";

export const FAVOURITES = "favourites";
export const getFavourites = () => {
  const favourites = window.localStorage.getItem(FAVOURITES);

  if (!favourites || !JSON.parse(favourites)) {
    window.localStorage.setItem(FAVOURITES, JSON.stringify([]));
    return [];
  }
  return JSON.parse(favourites);
};
export const useFavourites = () => {
  const [favourites, setStoredValue] = useState(getFavourites());
  const toggleFavourite = (imageId: string) => {
    const favourites = getFavourites();
    const toggledFavourites = favourites.includes(imageId)
      ? favourites.filter((id: string) => id !== imageId)
      : [...favourites, imageId];
    setStoredValue(toggledFavourites);
    window.localStorage.setItem(FAVOURITES, JSON.stringify(toggledFavourites));
  };
  return [favourites, toggleFavourite];
};
