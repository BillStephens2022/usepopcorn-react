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
import ErrorMessage from "./components/ErrorMessage";
// import { tempMovieData } from "./data/movieData";
// import { tempWatchedData } from "./data/movieData";

const tempQuery = "Pulp Fiction";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState(tempQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`
        );
  
        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }
        
        const data = await response.json();
  
        if (data.Response === "False") throw new Error("Movie not found!");
  
        setMovies(data.Search);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
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
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
