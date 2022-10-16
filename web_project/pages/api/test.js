export default async function handler(req, res) {
    console.log(req.body.value1) //Esto se visualizará en la terminal

    /* Es muy importante retornar algo, de lo contrario next.js no sabrá que hacer */
    res.status(200).json({ ok: true, msg: "Hola mundo desde el server" })
}