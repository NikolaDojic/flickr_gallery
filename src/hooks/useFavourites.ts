import { useState } from "react";

const FAVOURITES = "favourites";
const getFavourites = () => {
  const favourites = window.localStorage.getItem(FAVOURITES);
  if (!favourites) {
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
