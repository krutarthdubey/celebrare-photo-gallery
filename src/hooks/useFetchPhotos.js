import { useEffect, useState } from "react";

const PHOTOS_ENDPOINT = "https://picsum.photos/v2/list?limit=30";

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(PHOTOS_ENDPOINT, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`The photo service responded with ${response.status}.`);
        }

        const result = await response.json();
        if (!Array.isArray(result)) {
          throw new Error("The photo service returned an unexpected response.");
        }

        setPhotos(result);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "The photos could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
