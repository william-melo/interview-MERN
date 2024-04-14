import { useCallback, useRef, useState } from "react";
import { searchPhotos } from "../services/photos.js";

export function usePhotos({ search }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorPhotos, setErrorPhotos] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return; // Evitamos hacer llamados repetidos a la API si no ha cambiado

    try {
      setLoading(true);
      setErrorPhotos(false);
      previousSearch.current = search;
      const newPhotos = await searchPhotos({ search });
      setPhotos(newPhotos);
    } catch (error) {
      setErrorPhotos(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { photos, loading, errorPhotos, getMovies };
}
