import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { MovieList } from "./MovieList";
import { WatchList } from "./WatchList";
import { MovieDetails } from "./MovieDetails";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";

export const Key = "fc7f988";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");

  const { movies, isLoading, error } = useMovie(Key, query);

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
      <Nav movies={movies} query={query} setQuery={setQuery} />
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
  const [watched, setWatched] = useLocalStorage([], "watched");

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
