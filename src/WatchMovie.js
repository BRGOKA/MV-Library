function WatchMovie({
  setIsWatching,
  isWatching,
  title,
  id,
  type,
  season,
  ep,
}) {
  if (!isWatching) return;
  return (
    isWatching && (
      <>
        <button className="close_player" onClick={() => setIsWatching(false)}>
          x
        </button>
        <iframe
          title={`watch-${type}-${title}`}
          sandbox=" allow-same-origin allow-scripts"
          src={`https://vaplayer.ru/embed/movie/${id}`}
          width="100%"
          height="100%"
          className="movie"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </>
    )
  );
}

export default WatchMovie;
