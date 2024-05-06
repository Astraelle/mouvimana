import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../api/api';

const FilmDetails = () => {

    const [movie, setMovie] = useState(null)
    const { id } = useParams(); // Récupère l'Id du film depuis l'URL

    useEffect(() =>{
        const fetchMovieDetails = async () =>{
            try {
                const response = await axios.get(`${URL.FILM_ID}/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovieDetails();
    }, [id])

    if (!movie) {
        return(
            <div className='h-[90vh] pt-[55px]'>
                <p>En cours de chargement...</p>
            </div>
        )
    }
  return (
    <div className='h-[90vh] pt-[55px]'>
        <h2>{movie.titre}</h2>
        <p>De {movie.realisateurs}</p>
        <p>{movie.synopsis}</p>
        <p>{movie.anneeProd}</p>
    </div>
  )
}

export default FilmDetails