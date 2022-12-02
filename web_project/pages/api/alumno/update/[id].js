import { Tutelado } from "../../../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../../../services/dbConnect" //Función para conectarnos a la db

export default async function handler(req, res) {
    const { id } = req.query
    const info = req.body

    let state = await dbConnect() //Realizamos la conexión
    let alumno = {}
    
    if(state) {
        alumno = await Tutelado.findOneAndUpdate({ _id: id }, {
            nombre: info.name,
            matricula: info.matricula,
            carrera: info.carrera,
            semestre: info.semestre,
            ciclo_escolar: info.ciclo_escolar,
            notas: info.notas
        })
    }
    
    res.status(200).json({ ok: state })
}