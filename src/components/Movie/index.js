import "./Movie.css";

export default function Movie({
  name,
  isLiked,
  id,
  onDeleteMovie,
  onToggleLike,
}) {
  // the functions 'onDeleteMovie' and 'onToggleLike' are defined in the parent component (App) and passed in as props. 
  // They are used as click event handlers on the respective buttons 
  return (
    <section className="movie">
      <h2 className={`movie__title${isLiked ? " movie__title--is-liked" : ""}`}>
        {name}
      </h2>
      <div className="movie__actions">
        <button
          className="movie__button"
          type="button"
          title={isLiked ? "unlike movie" : "like movie"}
          onClick={() => onToggleLike(id)}
        >
          {isLiked ? (
            <span role="img" aria-label="Thumbs up">
              👍
            </span>
          ) : (
            <span role="img" aria-label="Thumbs down">
              👎
            </span>
          )}
        </button>
        <button
          className="movie__button"
          type="button"
          title="delete movie"
          onClick={() => onDeleteMovie(id)}
        >
          ✕
        </button>
      </div>
    </section>
  );
}
