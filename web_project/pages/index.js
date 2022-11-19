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
  const table_materias=useRef()
  /*
  Para enviar datos del formulario a la db, se puede realizar utilizando la función fetch() de javascript o la función handleAsyncReq que
  viene abajo.
  La url que le pasarás será /api/tutelado. Dicho archivo lo encuentras en /pages/api/tutelado.js, ahí viene una función 'handler'
  que contendrá la conexión a la db y la inserción de datos. Puedes guiarte del archivo /api/hello para ver un ejemplo.
  */

  function GetTableValues(table){
    var value
    
    let values=[]
    for(var i=1; i<table.rows.length; i++){
      value={
        materia:table.rows[i].cells[0].children[0].value, 
        calificacion:table.rows[i].cells[1].children[0].value,
        grado_dificultad:table.rows[i].cells[2].children[0].value,
        preferencia:table.rows[i].cells[3].children[0].value,
        tiempo_dedicado:table.rows[i].cells[4].children[0].value
      }
      values.push(value)
    }
    return values
  }

  async function SendData() {
    let data_obj = {
      name: input_name.current.value, //Obtenemos el valor del input
      matricula: input_matricula.current.value,
      carrera: input_carrera.current.value,
      semestre: input_semestre.current.value,
      ciclo_escolar: input_cicloescolar.current.value,
      materias: table_materias.current.value,
      notas: GetTableValues(table_materias.current)
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
  
  function AddRow(){
    var row=table_materias.current.insertRow()
    var cell1=row.insertCell().innerHTML="<input type='text' className='input_class'/>"
    var cell2=row.insertCell().innerHTML="<input type='text' className='input_class'/>"
    var cell3=row.insertCell().innerHTML="<input type='text' className='input_class'/>"
    var cell4=row.insertCell().innerHTML="<input type='text' className='input_class'/>"
    var cell5=row.insertCell().innerHTML="<input type='text' className='input_class'/>"

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

        <table ref={table_materias}>
          <tbody>
            <tr>
                <th>Materia</th>
                <th>Calificación</th>
                <th>Grado de dificultad</th>
                <th>Preferencia</th>
                <th>Tiempo dedicado</th>
            </tr>
          </tbody>
        </table>

        <button type='button' onClick={AddRow}>Añadir materia</button> {/* tipo se cambia a submit cuando quede bien calado */}

        <button type='button' onClick={SendData}>Enviar</button> {/* tipo se cambia a submit cuando quede bien calado */}

      </form>
    </div>
  )
}
