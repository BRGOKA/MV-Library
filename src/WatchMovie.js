function WatchMovie({ title, id, type, season, ep }) {
  return (
    <iframe
      title={`watch-${type}-${title}`}
      sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts"
      src="https://vaplayer.ru/embed/movie/tt23779058"
      width="100%"
      height="100%"
      className="movie"
      frameborder="0"
      allowfullscreen
    ></iframe>
  );
}

export default WatchMovie;
