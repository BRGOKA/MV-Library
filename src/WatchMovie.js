function WatchMovie({
  setIsWatching,
  isWatching,
  title,
  id,
  type,
  season = 1,
  episode = 1,
}) {
  if (!isWatching) return;
  let url;
  if (type === "movie") {
    url = `https://vaplayer.ru/embed/movie/${id}`;
  } else if (type === "series") {
    url = `https://vaplayer.ru/embed/tv/${id}/${season}/${episode}`;
  }
  return (
    isWatching && (
      <div onClick={() => setIsWatching(false)}>
        <button className="close_player" onClick={() => setIsWatching(false)}>
          x
        </button>
        <iframe
          title={`watch-${type}-${title}`}
          sandbox=" allow-same-origin allow-scripts"
          src={url}
          width="100%"
          height="100%"
          className="movie"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    )
  );
}

export default WatchMovie;
