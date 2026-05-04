import { useEffect, useState } from "react";

export function MovieList({ setTitle, movies, setSelectedId }) {
  function handleclick(movie) {
    setSelectedId(movie.imdbID);
    setTitle(movie.Title);
  }

  if (!movies.length)
    return <h1 className="noSearch">Please search for a movie</h1>;

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => handleclick(movie)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
