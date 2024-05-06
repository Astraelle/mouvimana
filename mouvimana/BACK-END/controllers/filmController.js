import xlsx from 'xlsx';
import path from 'path';
import Film from '../models/filmData.js'



const excelPath = path.join('data', "film.xlsx");
const excelData = () =>{
    try{
        const workbook = xlsx.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        return jsonData;
    }catch(e){
        throw e
    }
}

// Enlève tous les doublons
const excelDuplicate = () =>{
    const data = excelData();
    const uniqueData = [];
    const uniqueValue = new Set();
    data.forEach(row =>{
        if (!uniqueValue.has(row.Titre)) {
            uniqueValue.add(row.Titre);
            uniqueData.push(row);
        }
    })
    const duplicates = data.length - uniqueData.length;
    console.log(uniqueData);
    console.log(duplicates);
    return uniqueData;
}

// Filtre les données pour le bon schéma
const excelFilter = () =>{
    const data = excelDuplicate();
    const formatData = data.map(movie =>{
        const regex = /<[^>]*>/g;
        return{
            id: movie.Id,
            titre: movie.Titre,
            titreOriginal: movie["Titre original"],
            realisateurs: movie["Réalisateurs"],
            anneeProd: movie["Année de production"],
            nationnalite: movie["Nationalité"],
            duree: movie["Durée"],
            genre: movie.Genre,
            synopsis: movie.Synopsis.replaceAll(regex, "")
        }
        
    })
    return formatData
}


export const registerFilm = async (req, res) =>{
    try{
        const filmData = excelFilter();
        const dbData = await Film.find();
        if (dbData.length > 0) {
            await Film.deleteMany();
            await Film.create(filmData);
            res.status(200).json(filmData);
        }else{
            await Film.create(filmData);
            res.status(201).json(filmData);
        }
    }
    catch(err){
        res.status(500).json("Erreur lors de l'ajout en base de données", err);
    }
}

export const getFilm = async (req, res) =>{
    try {
        const getFilmData = await Film.find();
        res.status(200).json(getFilmData);
    } catch (err) {
        res.status(500).json("Erreur lors de la récupération des données", err)
    }
}

export const searchFilmByTitle = async (req, res) =>{
    const searchName = req.query.q;
    try {
        const movies = await Film.find({ titre: {$regex: searchName, $options: 'i'}});
        res.json(movies);
    } catch (error) {
        res.status(500).json("Erreur lors de la recherche du film", error);
    }
}

export const searchFilmById = async (req, res) =>{
    const searchId = req.params.id;
    try {
        const movies = await Film.findById(searchId);
        res.json(movies);
    } catch (error) {
        res.status(500).json("Erreur lors l'extraction des details du film", error);
    }
}