import Head from 'next/head'
import { useRef } from 'react'
import { handleAsyncReq } from '../lib/util'
import styles from '../styles/Home.module.css'

export default function Home() {
  const input_name = useRef()
  const input_matricula = useRef()
  const input_carrera = useRef()
  const input_semestre = useRef()
  const input_cicloescolar = useRef()

  /*
  Para enviar datos del formulario a la db, se puede realizar utilizando la función fetch() de javascript o la función handleAsyncReq que 
  viene abajo.
  La url que le pasarás será /api/tutelado. Dicho archivo lo encuentras en /pages/api/tutelado.js, ahí viene una función 'handler'
  que contendrá la conexión a la db y la inserción de datos. Puedes guiarte del archivo /api/hello para ver un ejemplo.
  */

  
  async function SendData() {
    let data_obj = {
      name: input_name.current.value, //Obtenemos el valor del input
      matricula: input_matricula.current.value,
      carrera: input_carrera.current.value,
      semestre: input_semestre.current.value,
      ciclo_escolar: input_cicloescolar.current.value
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
      <form /*onSubmit={SendData}*/>
        Nombre del estudiante&nbsp;
        <input type="text" className="input_class" size="30" ref={input_name} />&nbsp;&nbsp;
        Matricula&nbsp;
        <input type="text" className="input_class" size="6" maxLength="6" ref={input_matricula} />
        <br></br>

        Carrera&nbsp;
        <input type="text" className="input_class" size="5" ref={input_carrera} />&nbsp;&nbsp;
        Semestre&nbsp;
        <input type="text" className="input_class" size="5" ref={input_semestre} />
        Ciclo escolar&nbsp;
        <input type="text" className="input_class" size="5" ref={input_cicloescolar} />
        <br></br>
        <button type='button'>Enviar</button> {/* tipo se cambia a submit cuando quede bien calado */}
        
      </form>
    </div>
  )
}
