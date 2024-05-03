import express from 'express';
import { getFilm, registerFilm } from '../controllers/filmController.js';

const filmRouter = express.Router();

filmRouter.get('/add', registerFilm);
filmRouter.get('/get', getFilm);

export default filmRouter;