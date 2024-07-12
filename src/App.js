import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData } from "./data/movieData";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import SearchBar from "./components/SearchBar";


export default function App() {

  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </Navbar>
      <Main movies={movies} />
      
    </>
  );
}
