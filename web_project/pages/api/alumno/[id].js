import { Tutelado } from "../../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../../services/dbConnect" //Función para conectarnos a la db

export default async function handler(req, res) {
    const { id } = req.query

    let state = await dbConnect() //Realizamos la conexión
    let alumno = {}
    
    if(state) {
        alumno = await Tutelado.findOne({ _id: id }).exec()
    }
    
    res.status(200).json({ ok: state, data: alumno })
}