import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import PhotoCard from "./components/PhotoCard.jsx";
import { useFetchPhotos } from "./hooks/useFetchPhotos.js";
import {
  favouritesReducer,
  FAVOURITES_STORAGE_KEY,
  readSavedFavourites,
} from "./reducers/favouritesReducer.js";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="10.8" cy="10.8" r="6.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4.1 4.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LoadingState() {
  return (
    <div
      role="status"
      className="flex min-h-[320px] flex-col items-center justify-center gap-5 rounded-sm border border-dashed border-line bg-white/35"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-clay/20 border-t-clay" />
      <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
        Gathering the photographs
      </span>
      <span className="sr-only">Loading photos</span>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div
      role="alert"
      className="flex min-h-[320px] flex-col items-center justify-center rounded-sm border border-clay/20 bg-[#efe6df] px-6 text-center"
    >
      <span className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-clay">
        A quiet moment
      </span>
      <h2 className="font-display text-3xl text-ink">The collection is out of reach.</h2>
      <p className="mt-3 max-w-md font-sans text-sm leading-6 text-muted">
        {message} Check your connection, then refresh the page to try again.
      </p>
    </div>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favouriteIds, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    readSavedFavourites,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVOURITES_STORAGE_KEY,
        JSON.stringify(favouriteIds),
      );
    } catch {
      // The gallery still works if browser storage is unavailable.
    }
  }, [favouriteIds]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();

    if (!query) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLocaleLowerCase().includes(query),
    );
  }, [photos, searchTerm]);

  function handleToggleFavourite(photoId) {
    dispatch({ type: "toggle", photoId });
  }

  const collectionCountLabel = loading
    ? "Loading"
    : `${filteredPhotos.length} ${filteredPhotos.length === 1 ? "photograph" : "photographs"}`;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-5 pb-16 pt-6 sm:px-8 lg:px-14 lg:pt-8">
      <header className="flex items-center justify-between border-b border-line pb-5">
        <a href="#top" className="inline-flex items-center gap-3" aria-label="Stillroom home">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-clay/45">
            <span className="h-3 w-3 rounded-full bg-clay" />
            <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-olive" />
          </span>
          <span className="font-display text-[21px] leading-none tracking-[-0.04em] text-ink">
            stillroom
          </span>
        </a>

        <p className="hidden font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:block">
          A photo collection <span className="mx-2 text-line">/</span> 01—30
        </p>
      </header>

      <section
        id="top"
        className="relative isolate grid gap-6 overflow-hidden rounded-[4px] bg-ink px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_310px] lg:items-end lg:gap-12 lg:px-12 lg:py-12"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 -top-10 z-0 select-none font-display text-[220px] leading-none tracking-[-0.1em] text-white/[0.045] sm:-top-20 sm:text-[300px]"
        >
          30
        </span>
        <div className="relative z-10">
          <p className="mb-4 flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7a08a]">
            <span className="h-px w-7 bg-[#d7a08a]" />
            A study in seeing
          </p>
          <h1 className="max-w-[820px] font-display text-[clamp(2.9rem,7.3vw,6.5rem)] leading-[0.91] tracking-[-0.065em] text-paper">
            Collected <span className="font-display italic text-[#d7a08a]">moments.</span>
          </h1>
        </div>
        <p className="relative z-10 max-w-[340px] border-l border-white/15 pl-4 font-sans text-[13px] leading-[1.8] text-paper/70 sm:pl-5 lg:justify-self-end lg:pb-1">
          Thirty frames from the everyday. Find a photographer by name, and keep the images that stay with you.
        </p>
      </section>

      <section aria-label="Photo collection" className="border-t border-ink/80">
        <div className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-baseline gap-3">
            <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              The collection
            </h2>
            <span className="font-sans text-[11px] text-muted">
              {collectionCountLabel}
            </span>
          </div>

          <label className="flex w-full items-center gap-3 rounded-[3px] border border-line bg-white/55 px-4 py-3 text-muted transition focus-within:border-clay focus-within:bg-white sm:max-w-[340px]">
            <SearchIcon />
            <span className="sr-only">Search by photographer name</span>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search photographer"
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[13px] text-ink outline-none placeholder:text-muted/75 focus:ring-0"
            />
          </label>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isFavourite={favouriteIds.includes(String(photo.id))}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-line bg-white/30 px-6 text-center">
            <span className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-clay">
              No match in this collection
            </span>
            <h2 className="font-display text-3xl text-ink">No photographer found.</h2>
            <p className="mt-2 max-w-sm font-sans text-sm leading-6 text-muted">
              Try another name to look through the thirty photographs.
            </p>
          </div>
        )}
      </section>

      <footer className="mt-12 flex flex-col gap-2 border-t border-line pt-4 font-sans text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Stillroom <span className="mx-2 text-line">/</span> Photographs courtesy of Picsum</span>
        <span>Thirty frames, found in the everyday</span>
      </footer>
    </main>
  );
}
