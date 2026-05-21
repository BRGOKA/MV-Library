import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { MovieList } from "./MovieList";
import { WatchList } from "./WatchList";
import { MovieDetails } from "./MovieDetails";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";
import WatchMovie from "./WatchMovie";

export const Key = "fc7f988";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [showType, setShowType] = useState("");
  const [isWatching, setIsWatching] = useState(true);
  const { movies, isLoading, error } = useMovie(Key, query);

  useEffect(() => {
    window.addEventListener("keypress", function (e) {
      if (e.Key === "Escape") setIsWatching(false);
    });
    console.log(isWatching);

    return window.removeEventListener("keypress", (e) => {
      if (e.key === "Escape") setIsWatching(false);
    });
  }, [isWatching, setIsWatching]);

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
      {isWatching && (
        <WatchMovie title={title} id={selectedId} type={showType} />
      )}
      <Nav movies={movies} query={query} setQuery={setQuery} />
      <Main
        movies={movies}
        isLoading={isLoading}
        error={error}
        selectedID={selectedId}
        setSelectedId={setSelectedId}
        setTitle={setTitle}
        setShowType={setShowType}
        setIsWatching={setIsWatching}
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
  setShowType,
  setIsWatching,
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
            setShowType={setShowType}
            setSelectedId={setSelectedId}
            selectedID={selectedID}
            handleWatched={handleWatched}
            isWatched={isWatched}
            setIsWatching={setIsWatching}
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
