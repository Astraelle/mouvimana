// const mongoose = require('mongoose');
import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    id: { type: Number },
    titre: { type: String },
    titreOriginal: { type: String },
    realisateurs: { type: String },
    anneeProd: { type: Number },
    nationnalite: { type: String },
    duree: { type: String },
    genre: { type: String },
    synopsis: { type: String }
});

const Film = mongoose.model("film", filmSchema);

export default Film