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
import { tempMovieData } from "./data/movieData";
import { tempWatchedData } from "./data/movieData";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=pulp fiction`).then((response) => response.json()).then((data) => setMovies(data.Search));
  }, []);
     

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
