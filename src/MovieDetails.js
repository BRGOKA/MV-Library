import { useState, useEffect } from "react";
import { Key, Loader } from "./App";
import Button from "./Button";

export function MovieDetails({
  watched,
  handleWatched,
  setWatched,
  selectedID,
  setSelectedId,
  isWatched,
  setShowType,
  setIsWatching,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleWatchBtn() {
    const isWatched = watched.find((movie) => movie.imdbID === selectedID);

    if (isWatched) {
      const newWatchedArray = watched.filter(
        (movie) => movie.imdbID !== selectedID,
      );
      setWatched(newWatchedArray);
    } else {
      const newWatchedMovie = {
        imdbID: selectedID,
        Title: movieDetails.Title,
        Year: movieDetails.Released,
        Poster: movieDetails.Poster,
        imdbRating: Number(movieDetails.imdbRating),
        runtime: Number(movieDetails.Runtime?.split(" ").at(0) ?? 0),
      };

      handleWatched(newWatchedMovie);
    }
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&i=${selectedID}`,
          );
          if (!res.ok) throw new Error("failed to fetch movie");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovieDetails(data);
          console.log(data);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
        } finally {
        }
      }
      fetchMovieDetails();
    },
    [selectedID],
  );

  useEffect(() => {
    setShowType(movieDetails.Type);
  }, [movieDetails.Type, setShowType]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img
              src={movieDetails.Poster}
              alt={`${movieDetails.Title} poster`}
            />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>{movieDetails.Type}</p>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>
                <span>⭐</span> {movieDetails.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <button className="btn-add" onClick={handleWatchBtn}>
                {isWatched ? "- remove from watched" : "+ Add to watched"}
              </button>
              <Button
                seasons={movieDetails.totalSeasons}
                setIsWatching={setIsWatching}
                type={movieDetails.Type}
                id={selectedID}
                title={movieDetails.Title}
              />
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring {movieDetails.Actors}</p>
            <p>Directed By {movieDetails.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
