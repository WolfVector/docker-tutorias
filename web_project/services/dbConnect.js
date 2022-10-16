import mongoose from "mongoose"

//Obtenemos el tipo de ambiente
const env = process.env.NODE_ENV
let mongoUrl = "mongodb://admin:password@localhost:27018/tutorias?authSource=admin";

//Si estamos en producción, entonces cambiamos la url para comunicarnos efectivamente con los dockers
if(env == "production")
    mongoUrl = "mongodb://admin:password@mongodb:27017/tutorias?authSource=admin";

let cached; 

export async function dbConnect() {
    let ret = true

    if(!cached) {
        console.log("Iniciando nueva conexion a la bd")

        try {
            cached = await mongoose.connect(mongoUrl) //Realizamos la conexión
        
            console.log('MongoDB connected!!')
        } catch (err) {
            console.log('Failed to connect to MongoDB', err)
            ret = false
        }
    }

    return ret
}