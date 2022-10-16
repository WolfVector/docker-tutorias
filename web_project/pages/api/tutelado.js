import { Tutelado } from "../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../services/dbConnect" //Función para conectarnos a la db

export default async function handler(req, res) {
    let state = await dbConnect() //Realizamos la conexión
    if(state) { //Si la conexión fue satisfactoria, entonces...
    }
}