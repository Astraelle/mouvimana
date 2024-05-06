import express from 'express';
import { getFilm, registerFilm, searchFilmById, searchFilmByTitle } from '../controllers/filmController.js';

const filmRouter = express.Router();

filmRouter.get('/add', registerFilm);
filmRouter.get('/get', getFilm);
filmRouter.get('/search', searchFilmByTitle);
filmRouter.get('/details/:id', searchFilmById);

export default filmRouter;