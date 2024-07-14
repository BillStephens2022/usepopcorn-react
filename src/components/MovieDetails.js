import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function MovieDetials({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
    
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
