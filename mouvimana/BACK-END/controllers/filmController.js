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

const excelFilter = () =>{
    const data = excelData();
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