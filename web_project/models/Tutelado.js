import mongoose from "mongoose"

/* En este documento se encuentra la definición de nuestros modelos */

/* Subdocumento ( subtabla ) que define las notas del alumno */
const notaSchema = new mongoose.Schema({
    materia: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    grado_dificultad: {
        type: String,
        required: true
    },
    preferencia: {
        type: String,
        required: true
    },
    tiempo_dedicado: {
        type: String,
        required: true
    }
})

/* Documento padre (tabla padre) que almacena los datos del alumno y sus notas */
const tuteladoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    matricula: {
        type: Number,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    semestre: {
        type: Number,
        required: true
    },
    ciclo_escolar: {
        type: String,
        required: true
    },
    notas: [notaSchema] //Un array de subdocumentos (subtablas)
})

let Tutelado = mongoose.models.Tutelado || mongoose.model("Tutelado", tuteladoSchema) //Creamos el modelo

export {
    Tutelado //Exportamos para que pueda ser usado en otros archivos
}