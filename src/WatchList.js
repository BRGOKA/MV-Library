import { use, useState } from "react";

export function WatchList({ setTitle, watched, setSelectedId }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchSummary watched={watched} />
          <WatchedMoviesList
            setTitle={setTitle}
            watched={watched}
            setSelectedId={setSelectedId}
          />
        </>
      )}
    </div>
  );
}
function WatchedMoviesList({ setTitle, watched, setSelectedId }) {
  function handleclick(movie) {
    setSelectedId(movie.imdbID);
    setTitle(movie.Title);
  }
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID} onClick={() => handleclick(movie)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const watchTime = watched.reduce((total, movie) => total + movie.runtime, 0);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchTime} min</span>
        </p>
      </div>
    </div>
  );
}
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
