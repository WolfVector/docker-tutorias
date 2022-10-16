// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tutelado } from "../../models/Tutelado" //Modelo de la tabla Tutelado 
import { dbConnect } from "../../services/dbConnect" //Función para conectarnos a la db

//Esta función será llamada cuando accedamos a la url /api/hello
export default async function handler(req, res) {
  let state = await dbConnect() //Realizamos la conexión
  if(state) { //Si la conexión fue satisfactoria, entonces...

    /* Crea un nuevo registro de prueba */
    const tutelado = await Tutelado.create({
      nombre: 'Alejandro',
      matricula: 160067,
      carrera: 'ITI',
      semestre: 9,
      ciclo_escolar: '2022',
      notas: [
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
    res.status(200).json({ ok: true })
  }
  else {
     /* Es muy importante retornar algo, de lo contrario next.js no sabrá que hacer */
    res.status(200).json({ ok: false, msg: "No se pudo conectar a la bd" })
  }
}
