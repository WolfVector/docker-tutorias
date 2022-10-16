import Head from 'next/head'
import { useRef } from 'react'
import { handleAsyncReq } from '../lib/util'
import styles from '../styles/Home.module.css'


export default function Home() {
  const input_test = useRef()

  /*
  Para enviar datos del formulario a la db, se puede realizar utilizando la función fetch() de javascript o la función handleAsyncReq que 
  viene abajo.
  La url que le pasarás será /api/tutelado. Dicho archivo lo encuentras en /pages/api/tutelado.js, ahí viene una función 'handler'
  que contendrá la conexión a la db y la inserción de datos. Puedes guiarte del archivo /api/hello para ver un ejemplo.
  */

  
  async function sendTest() {
    let data_obj = {
      value1: input_test.current.value //Obtenemos el valor del input
    }

    //Dentro de /api/test viene una función 'handler' con parametros req y res.
    //Podrás acceder a los valores de 'data_obj' utilizando res.body.value1 
    let response = await handleAsyncReq('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_obj) //Enviamos la variable que contiene los datos
    })

    if(response === false) {
      console.log("Hubo un error al procesar la petición") //Esto se visualizará en la consola del navegador
    }
    else {
      //Esto se visualizará en la consola del navegador
      console.log("El server proceso correctamente la petición")
      console.log(response)
    }
  }

  return (
    <div>
      Hola mundo 
      
      <form>
        <input type="text" className="input_class" ref={input_test} />
        <button type='button' onClick={sendTest}>Enviar</button>
      </form>
    </div>
  )
}
