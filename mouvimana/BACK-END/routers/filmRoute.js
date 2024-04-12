import express from 'express';
import { registerFilm } from '../controllers/filmController.js';

const filmRouter = express.Router();

filmRouter.get('/add', registerFilm);

export default filmRouter;