function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className="h-[18px] w-[18px]"
    >
      <path
        d="M20.4 4.8a5.1 5.1 0 0 0-7.2 0L12 6l-1.2-1.2a5.1 5.1 0 0 0-7.2 7.2l1.2 1.2L12 20.4l7.2-7.2 1.2-1.2a5.1 5.1 0 0 0 0-7.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PhotoCard({ photo, index, isFavourite, onToggleFavourite }) {
  return (
    <article className="group min-w-0">
      <div className="relative isolate overflow-hidden rounded-[4px] bg-stone-200 shadow-[0_16px_38px_-24px_rgba(37,37,34,0.62)] ring-1 ring-ink/10">
        <img
          src={`https://picsum.photos/id/${photo.id}/900/1125`}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-ink/10"
        />

        <span className="absolute left-3 top-3 rounded-full border border-white/55 bg-[#f8f6f1]/85 px-2.5 py-1 font-sans text-[10px] font-medium tracking-[0.12em] text-stone-700 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <button
          type="button"
          aria-label={`${isFavourite ? "Remove" : "Add"} ${photo.author} photo ${isFavourite ? "from" : "to"} favourites`}
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
            isFavourite
              ? "border-white/70 bg-[#fcf8f4] text-clay"
              : "border-white/70 bg-[#f8f6f1]/80 text-ink backdrop-blur-sm hover:scale-105 hover:bg-white"
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
          <span className="mb-1 block font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
            Photographer
          </span>
          <h2 className="truncate font-display text-[19px] leading-tight tracking-[-0.02em] text-white sm:text-[21px]">
            {photo.author}
          </h2>
        </div>
      </div>
    </article>
  );
}
