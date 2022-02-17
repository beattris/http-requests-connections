import React, { useEffect, useState, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    fetch('https://react-http-practice-a269a-default-rtdb.firebaseio.com/movies.json')
    .then(response => {
      setIsLoading(true)
      setError(null)
      return response.json();
    })
    .then(data => {
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies)
      setIsLoading(false)
    })
    .catch(error => {
      setError(error)
      setIsLoading(false)
    })
  }, []);

   // USING useEffect TO CALL THE fetchMoviesHandler TO LOAD THE API WHEN THE CONDITIONS IN THE ARRAY CHANGES []
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-practice-a269a-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }

  let content = <p>No movies fetched yet</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if(error) {
    content = <p>error...could not fetch movies</p>
  }
  if(isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
