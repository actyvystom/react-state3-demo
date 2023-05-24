import { useState } from "react";
import "./styles.css";
import Movie from "./components/Movie/index.js";
import Form from "./components/Form";
import { uid } from "uid";
// declare an array as initial data for our movies state variable
const initialMovieData = [
  {
    id: "28djdh72",
    name: "The Incredible Hulk",
    isLiked: false,
  },
  {
    id: "dknseu2",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "dkwi02ksk",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

export default function App() {
  // declare the movies state variable and initialize it with our data array 
  const [movies, setMovies] = useState(initialMovieData);
  // declare a handler function we can pass as a prop (onAddMovie) to our form component for adding a new movie to our state variable
  function handleAddMovie(newMovie) {
    // as we must treat state variables as immutable, we need to create a copy of our existing movies state array by
    // a) spreading the existing array (...movies) and then adding our new movie as a new object to our array ({id: uid(), ...newMovie} <- we spread the object we get passed into our handler function)  
    setMovies([...movies, { id: uid(), ...newMovie }]);
  }
   // we declare a handler function to pass as prop (onDeleteMovie) to our movie component
  function handleDeleteMovie(id) {
     // for deleting a movie from our movies state array, we create a copy by filtering our array for all elements which do NOT have the id (of the one we want  to delete)
    // so the movie we want to delete gets excluded from our new array
    setMovies(movies.filter((movie) => movie.id !== id));
  }
  // we declare a handler function to pass as prop (onToggleLike) to our movie component 
  function handleToggleLike(id) {
    // for toggling the like property of the movie identified by the id passed into our handler function, we use the map array method to get a copy of the full movies array
    // the full movies array. By checking for the movie id via ternary operator, we identify the movie object, we want the 'isLiked' value toggled. To create a new object of this movie, we spread it and overwrite the isLiked value with the opposite value of the former one (as it is boolean, we toggle this way)
    // all other movies are untouched and returned as is in our copy
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  return (
    <div className="app">
      <h1>Favorite Movies</h1>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              name={movie.name}
              isLiked={movie.isLiked}
              onDeleteMovie={handleDeleteMovie}
              id={movie.id}
              onToggleLike={handleToggleLike}
            />
          </li>
        ))}
      </ul>
      <Form onAddMovie={handleAddMovie} />
    </div>
  );
}
