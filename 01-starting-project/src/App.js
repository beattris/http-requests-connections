import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films')
    .then(response => {
      setIsLoading(true)
      setError(null)
      return response.json();
    }).then(data => {
      // TRANSFORMING THE API OBJECT KEYS TO MATCH OUR PROPS IN THE 'MoviesList.js' FILE
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        }
      })
      setMovies(transformedMovies)
      setIsLoading(false)
    })
    .catch(error => {
      setError(error)
      setIsLoading(false)
    })
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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
