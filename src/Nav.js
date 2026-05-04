import { useRef, useState } from "react";
import { useKey } from "./useKey";

export function Nav({ movies, query, setQuery }) {
  const [searchQuery, setSearchQuery] = useState("");
  function fetchMovies(e) {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  }
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setSearchQuery("");
  });

  // useEffect(
  //   function () {
  //     function callback(e) {}
  //     document.addEventListener("keydown", callback);
  //     return () => document.removeEventListener("keydown", callback);
  //   },
  //   [setSearchQuery],
  // );
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>MV Library</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => fetchMovies(e, query)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}
