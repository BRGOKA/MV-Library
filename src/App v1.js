import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { MovieList } from "./MovieList";
import { WatchList } from "./WatchList";
import { MovieDetails } from "./MovieDetails";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const Key = "fc7f988";
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
          );
          if (!res.ok) throw new Error("somthing went wrong when fetching");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies(tempMovieData);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query],
  );
  useEffect(
    function () {
      if (selectedId) {
        document.title = `Movie | ${title}`;
      }
      return function () {
        document.title = "MV Library";
      };
    },
    [title, selectedId],
  );
  return (
    <>
      <Nav
        movies={movies}
        setMovies={setMovies}
        query={query}
        setQuery={setQuery}
      />
      <Main
        movies={movies}
        isLoading={isLoading}
        error={error}
        selectedID={selectedId}
        setSelectedId={setSelectedId}
        setTitle={setTitle}
      />
    </>
  );
}

function Main({
  setTitle,
  movies,
  isLoading,
  error,
  selectedID,
  setSelectedId,
}) {
  const [watched, setWatched] = useState(tempWatchedData);
  const isWatched = watched.some((movie) => movie.imdbID === selectedID);
  function handleWatched(movie) {
    setWatched([...watched, movie]);
  }
  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList
            setTitle={setTitle}
            movies={movies}
            setSelectedId={setSelectedId}
          />
        )}
        {error && <ErrorDisp message={error} />}
      </Box>
      <Box>
        {selectedID ? (
          <MovieDetails
            watched={watched}
            setWatched={setWatched}
            setSelectedId={setSelectedId}
            selectedID={selectedID}
            handleWatched={handleWatched}
            isWatched={isWatched}
          />
        ) : (
          <WatchList
            setTitle={setTitle}
            watched={watched}
            setSelectedId={setSelectedId}
          />
        )}
      </Box>
    </main>
  );
}

export function Loader() {
  return <p className="loader">LOADING...</p>;
}

function ErrorDisp(message) {
  return (
    <p className="error">
      <span>❌{message.message}</span>
    </p>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
