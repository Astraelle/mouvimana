import xlsx from 'xlsx';
import path from 'path';
import Film from '../models/filmData.js'



const excelPath = path.join('data', "film.xlsx");
// const data = () =>{
//     return jsonData
//     .then()
// }
// const newFilm = new Film({
//     id: jsonData.map(movie => movie.Id),
//     titre: jsonData.map(movie => movie.Titre),
//     titreOriginal: jsonData.map(movie => movie["Titre original"])
// })
// console.log(newFilm._id);
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

// console.log(excelData());

const excelFilter = () =>{
    const data = excelData();
    console.log(data);
}
console.log(excelFilter());


export const registerFilm = async (req, res) =>{
    try{
        const workbook = xlsx.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        
        const dbData = await Film.find();
        if (dbData.length > 0) {
            await Film.deleteMany();
            await Film.create(jsonData);
            res.status(200).json(jsonData);
        }else{
            await Film.create(jsonData);
            res.status(201).json(jsonData);
        }
    }
    catch(err){
        res.status(500).json("Erreur lors de l'ajout en base de données", err);
    }
}