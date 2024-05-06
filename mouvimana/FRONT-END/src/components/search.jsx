import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../api/api';
import { Link } from 'react-router-dom'

const MovieSearch = () => {

    const [searchMovie, setSearchMovie] = useState("");
    const [resultMovie, setResultMovie] = useState([]);

    const handleSearch = async (term) => {
        try {
            if (term.trim() === '') {
                setResultMovie([]);
                return;
            }
            const response = await axios.get(`${URL.FILM_SEARCH}?q=${term}`);
            setResultMovie(response.data.slice(0, 3));
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) =>{
        const input = e.target.value;
        setSearchMovie(input);
        handleSearch(input);
    }

  return (
    <div className='grid grid-rows-[50px_minmax(0,1fr)] grid-cols-1 items-center w-[200px]'>
        <input 
            type="text" 
            aria-label='search button'
            value={searchMovie}
            onChange={handleInputChange}
            placeholder='RECHERCHER'
            className='focus:border-[#fafafa] rounded-[5px] bg-[#460074] placeholder:text-[#fafafa] text-[#fafafa] h-[100%]'
        />
        <ul className='text-clip bg-[#460074] grid rounded-[10px] '>
            {resultMovie.map(movie => (
                <li key={movie.id} className='text-clip pl-[5px] h-[50px] grid items-center border-t-[#740067] border-t-2'>
                    <Link to={`/film/${movie._id}`} className='text-[#fafafa]'>{movie.titre}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MovieSearch