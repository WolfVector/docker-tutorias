import { Tutelado } from "../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../services/dbConnect" //Función para conectarnos a la db

export default async function handler(req, res) {
    let state = await dbConnect() //Realizamos la conexión
    let alumnos = {}

    if(state) { //Si la conexión fue satisfactoria, entonces...
        alumnos = await Tutelado.find({})
    }

    res.status(200).json({ ok: state, data: alumnos })
}