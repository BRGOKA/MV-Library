function Button({ type, id }) {
  function handleWatch() {
    console.log(id);
  }
  return (
    <button className="btn-add" onClick={handleWatch}>
      watch {type}
    </button>
  );
}

export default Button;
