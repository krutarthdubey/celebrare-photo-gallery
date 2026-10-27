# Stillroom — a photo collection

A React + Vite photo gallery built for the Celebrare Frontend React Internship pre-screening assignment. It fetches 30 images from Picsum, filters the loaded photos by author, and saves favourites in browser storage.

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To create and preview a production build, run:

```bash
npm run build
npm run preview
```

## Implementation map

- `src/hooks/useFetchPhotos.js` fetches the 30-photo collection and returns `photos`, `loading`, and `error`.
- `src/App.jsx` renders the gallery, memoizes the author search result with `useMemo`, and uses a `useCallback` handler for search input.
- `src/reducers/favouritesReducer.js` owns favourite toggling and safely loads saved photo IDs from `localStorage`.
- `src/components/PhotoCard.jsx` presents each photo, author, and accessible heart button.
- Tailwind CSS 4 is integrated through the official Vite plugin; there are no UI component libraries.

## Five-minute screen-recording script

### 0:00–0:35 — Introduce the app

“This is Stillroom, a photo gallery built for the Celebrare React internship assignment. It loads thirty photos from Picsum, lets you search by author, and saves favourites. The layout uses a single, responsive photo grid: one column on mobile, two on tablet, and four on desktop.”

### 0:35–1:20 — Show it working

“I’ll refresh once so you can see the loading spinner while the Picsum request is in flight.” Wait for the photos to appear. “If the request fails, the page shows a clear error state. I can type an author name here and the visible collection updates immediately. This filters the photos already in memory, so typing does not make another API request. I can also mark and unmark a photo with its heart button.”

Type part of an author name, clear it, and toggle a heart on a photo.

### 1:20–2:05 — Explain the fetch hook

“The `useFetchPhotos` hook keeps the request separate from the gallery UI. It returns exactly three values: `photos`, `loading`, and `error`. It checks the response, handles a failed request, and uses an abort controller so a request is cleaned up when the component unmounts.”

Open `src/hooks/useFetchPhotos.js` and briefly point to the return object.

### 2:05–2:55 — Explain search and performance hooks

“The search input handler is wrapped in `useCallback`, which keeps the same handler reference between renders. `useMemo` computes the filtered list from the photos and search text. It only recomputes when one of those inputs changes. The fetch hook has no search dependency, so searching never refetches the collection.”

Open `src/App.jsx` and point to `handleSearchChange` and `filteredPhotos`.

### 2:55–3:50 — Explain reducer and persistence

“Favourite IDs are managed by `useReducer`. The reducer handles one action, toggling a photo ID in or out of the list. It stays pure; a separate effect writes the new list to localStorage. The initial reducer state reads saved IDs, so existing favourites return after a refresh.”

Open `src/reducers/favouritesReducer.js`, return to the browser, and refresh to show the heart remains selected.

### 3:50–4:35 — Show the responsive gallery

“Each card contains the photo, its author, and an accessible heart button. The Tailwind grid changes at responsive breakpoints: one column on small screens, two columns from tablet size, and four columns on desktop. The search also has an empty state when no author matches.”

Resize the browser narrower if time permits; otherwise point to the grid classes in `src/App.jsx`.

### 4:35–5:00 — Hardest part and close

“The hardest part was keeping favourites persistent without putting browser storage side effects inside the reducer. I initialize the reducer from localStorage, keep the reducer pure, then persist changes in an effect. That keeps the state predictable and lets favourites survive a refresh. That completes the seven requirements.”
