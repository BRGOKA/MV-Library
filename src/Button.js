import { useState } from "react";

function Button({ seasons, setIsWatching, title, type, id }) {
  const [season, setSeason] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  let seasonArray = Array.from(
    { length: seasons },
    (element, index) => index + 1,
  );

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

  return (
    <>
      {type === "series" ? (
        <div className="ep-selector">
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
        </div>
      ) : null}

      <button className="btn-add" onClick={handleWatch}>
        watch {type}
      </button>
    </>
  );
}

export default Button;
