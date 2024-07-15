import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import SearchBar from "./components/SearchBar";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        // ignore abort err
        console.log(error.message);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
