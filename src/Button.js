function Button({ setIsWatching, title, type, id }) {
  function handleWatch() {
    setIsWatching(true);
  }
  return (
    <button className="btn-add" onClick={handleWatch}>
      watch {type}
    </button>
  );
}

export default Button;
