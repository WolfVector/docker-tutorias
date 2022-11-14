import { Tutelado } from "../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../services/dbConnect" //Función para conectarnos a la db

export default async function handler(req, res) {
    console.log(req.body.name) //Esto se visualizará en la terminal
    console.log(req.body.matricula) //Esto se visualizará en la terminal

    StoreInformation(req.body,res)
    
    /* Es muy importante retornar algo, de lo contrario next.js no sabrá que hacer */
    // res.status(200).json({ ok: true, msg: "Data stored successfully" })
}

async function StoreInformation(info,res) {
    let state = await dbConnect() //Realizamos la conexión
  if(state) { //Si la conexión fue satisfactoria, entonces...

    /* Crea un nuevo registro de prueba */
    const tutelado = await Tutelado.create({
      nombre: info.name,
      matricula: info.matricula,
      carrera: info.carrera,
      semestre: info.semestre,
      ciclo_escolar: info.ciclo_escolar,
      notas: 
      [
        {
          materia: 'materia 1',
          calificacion: 8,
          grado_dificultad: 'Mediano',
          preferencia: 'Alta',
          tiempo_dedicado: '2 horas'
        },
        {
          materia: 'materia 2',
          calificacion: 10,
          grado_dificultad: 'Fácil',
          preferencia: 'Baja',
          tiempo_dedicado: '1 hora'
        },
        {
          materia: 'materia 1',
          calificacion: 9,
          grado_dificultad: 'Mediano',
          preferencia: 'Media',
          tiempo_dedicado: '5 horas'
        },
      ]
    }) 
    
    /* Es muy importante retornar algo, de lo contrario next.js no sabrá que hacer */
    res.status(200).json({ ok: true,msg: 'data stored successfully'})
  }
  else {
     /* Es muy importante retornar algo, de lo contrario next.js no sabrá que hacer */
    res.status(200).json({ ok: false, msg: "No se pudo conectar a la bd" })
  }
}