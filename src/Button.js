import { useEffect, useRef, useState } from "react";

function Button({
  season,
  setSeason,
  episode,
  setEpisode,
  seasons,
  setIsWatching,
  title,
  type,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  let seasonArray = Array.from(
    { length: seasons },
    (element, index) => index + 1,
  );

  function handleEpisodeChange(event) {
    const value = Number(event.target.value);
    setEpisode(value >= 1 ? value : "");
  }

  function handleWatch() {
    setIsWatching(true);
  }

  function toggleSeasonMenu() {
    setIsOpen((open) => !open);
  }

  function selectSeason(value) {
    setSeason(value);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {type === "series" ? (
        <div className="ep-selector" ref={dropdownRef}>
          <button
            type="button"
            className="btn-add season-toggle"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={toggleSeasonMenu}
          >
            <span className="season-view">Season {season}</span>
          </button>

          <div
            className={`dropdown-menu ${isOpen ? "show" : ""}`}
            style={{ display: isOpen ? "block" : "none" }}
            role="menu"
          >
            {seasonArray.map((value) => (
              <button
                key={value}
                type="button"
                className={`dropdown-item season-item ${
                  season === value ? "active" : ""
                }`}
                onClick={() => selectSeason(value)}
              >
                Season {value}
              </button>
            ))}
          </div>

          <input
            type="number"
            min="1"
            className="episode-input"
            value={episode}
            onChange={handleEpisodeChange}
            placeholder="Episode"
          />
        </div>
      ) : null}

      <button className="btn-add" onClick={handleWatch}>
        watch {type === "movie" ? "movie" : "episode"}
      </button>
    </>
  );
}

export default Button;
