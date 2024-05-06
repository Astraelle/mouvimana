import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { env } from './config/config.js';
import filmRouter from './routers/filmRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Connexion à MongoDB
mongoose.connect(env.mongo)
    .then(() =>{
        console.log("Connexion à MongoDB réussie");
    })
    .catch((err) =>{
        console.error("Erreur de connexion à MongoDB", err);
    })

// Port
const PORT = env.port || 8080

// Routes
app.use("/api/film", filmRouter);
app.use("/api/user", userRouter);

// Serveur
app.listen(PORT, () =>{
    console.log(`Port ouvert à http://localhost:${PORT}`);
})