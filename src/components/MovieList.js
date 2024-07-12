import { useState } from "react";
import { tempMovieData } from "../data/movieData";
import Movie from "./Movie";

export default function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
       <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
