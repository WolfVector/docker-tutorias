import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import { alertMessage, handleAsyncReq } from '../lib/util'
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
      alertMessage("Error: hubo un problema en el servidor", "error")
    }
    else {
      //Esto se visualizará en la consola del navegador
      console.log("El server proceso correctamente la petición")
      console.log(response)
      alertMessage("Listo", "success")
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
  <div className='bg-gray-200 shadow-lg'>
    <div className='pl-2 pt-2'>
      <h1 className="text-3xl font-semibold">Tutorias UPSLP</h1>
      <p className="text-sm text-gray-600">Sistema de tutorias para la UPSLP</p>
    </div>
    <div className='absolute right-4 top-2'>
      <Link href="/alumnos">
        <button className='bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700'>
          Ver alumnos
        </button>
      </Link>
    </div>
      <div>
        <form className="px-4 my-32 max-w-3xl mx-auto space-y-6"/*onSubmit={SendData}*/>      
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="name">Nombre del estudiante</label>
              <input type="text" name="nombre" className="border border-gray-100 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-1000" size="30" ref={input_name} />
            </div>
            
            <div>
              <label htmlFor="matricula">Matricula</label>
              <input type="text" name="matricula" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="6" maxLength="6" ref={input_matricula} />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div>
              <label htmlFor="carrera">Carrera</label>
              <input type="text" name="carrera" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="5" ref={input_carrera} />
            </div>

            <div>
              <label htmlFor="semestre">Semestre</label>
              <input type="text" name="semestre" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="5" ref={input_semestre} />
            </div>
          </div>
          
          
          <div>
            <label htmlFor="ciclo">Ciclo Escolar</label>
            <input type="text" name="ciclo" className="border border-gray-100 block py-2 px-4 w-120 rounded focus:outline-none focus:border-teal-1000" size="7" ref={input_cicloescolar} />
          </div>
        

          <table ref={table_materias}>
          <thead className="bg-gray-250 border-b-2 border-white-200">
                <tr>
                    <th>Materia</th>
                    <th>Calificación</th>
                    <th>Grado de dificultad</th>
                    <th>Preferencia</th>
                    <th>Tiempo dedicado</th>
                </tr>
              </thead>
            <tbody>
              
              
            </tbody>
          </table>
          <div className="px-2 py-6 flex justify-between bg-gray-250">
            <button type='button' className="bg-yellow-600 px-4 py-2 text-white rounded hover:bg-yellow-700" onClick={AddRow}>Añadir materia</button> {/* tipo se cambia a submit cuando quede bien calado */}
            <button type='button' className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700" onClick={SendData}>Enviar</button> {/* tipo se cambia a submit cuando quede bien calado */}
          </div>
          

        </form>
      </div>
    </div>
  )
}
