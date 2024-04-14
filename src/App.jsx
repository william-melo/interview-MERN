import { useCallback } from "react";
import "./App.css";

import { Photos } from "./components/Photos";
import { usePhotos } from "./hooks/usePhotos";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  //const API_KEY = "vRG9qHyg-RUoHFqK52aVwH2Yf4BjcQ6jBot3_oNHfOA"
  //const URL = "https://api.unsplash.com/search/photos/?client_id=vRG9qHyg-RUoHFqK52aVwH2Yf4BjcQ6jBot3_oNHfOA&query=love&page=1"
  const { search, setSearch, error } = useSearch();
  const { photos, getMovies } = usePhotos({ search });

  const debouncedMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300)
  );

  // Form Submit Functionality
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  // Input Submit Click Event Handler
  const handleChange = (event) => {
    const newSearch = event.target.value.trimStart();
    setSearch(newSearch);
    debouncedMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Search Photos :D</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cats, Dogs, Sunset, Moon"
            onChange={handleChange}
            name="query"
            value={search}
          />
          <button>Submit</button>
        </form>
      </header>
      <main>
        {error && <p>{error}</p>}
        <Photos photos={photos} />
      </main>
    </div>
  );
}

export default App;
