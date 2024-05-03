import React, { useState } from 'react'
import axios from 'axios';

const MovieSearch = () => {

    const [searchMovie, setSearchMovie] = useState("");
    const [resultMovie, setResultMovie] = useState([]);
    const [typeTimeout, setTypeTimeout] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`api/film/get?q=${searchMovie}`);
            setResultMovie(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) =>{
        const input = e.target.value;
        setSearchMovie(input);
        clearTimeout(typeTimeout);
        const timeout = setTimeout(() =>{
            handleSearch(input)
        }, 300)
        setTypeTimeout(timeout);
    }

  return (
    <>
        <input 
            type="text" 
            aria-label='search button'
            value={searchMovie}
            onChange={handleInputChange}
            placeholder='Rechercher'
        />
        <ul>
            {resultMovie.map(movie => (
                <li key={movie.id}>{movie.titre}</li>
            ))}
        </ul>
    </>
  )
}

export default MovieSearch