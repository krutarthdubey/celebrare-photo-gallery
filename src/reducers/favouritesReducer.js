export const FAVOURITES_STORAGE_KEY = "stillroom-favourite-photos";

export function readSavedFavourites() {
  try {
    const savedValue = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
    const parsedValue = savedValue ? JSON.parse(savedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter((photoId) => typeof photoId === "string" || typeof photoId === "number")
      .map(String);
  } catch {
    return [];
  }
}

export function favouritesReducer(favouriteIds, action) {
  switch (action.type) {
    case "toggle": {
      const photoId = String(action.photoId);

      return favouriteIds.includes(photoId)
        ? favouriteIds.filter((savedId) => savedId !== photoId)
        : [...favouriteIds, photoId];
    }
    default:
      return favouriteIds;
  }
}
