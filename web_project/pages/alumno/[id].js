import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { alertMessage, handleAsyncReq } from '../../lib/util'

function Alumno() {
  const router = useRouter()
  const { id } = router.query
  const [alumnoData, setAlumnoData] = useState({
    nombre: '',
    matricula: '',
    carrera: '',
    semestre: '',
    ciclo_escolar: '',
    notas: []      
  })

  const input_name = useRef()
  const input_matricula = useRef()
  const input_carrera = useRef()
  const input_semestre = useRef()
  const input_cicloescolar = useRef()
  const table_materias=useRef()

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
    let response = await handleAsyncReq('/api/alumno/update/' + id, {
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

  async function getAlumno() {
    let response = await handleAsyncReq('/api/alumno/' + id, {
        method: 'GET'
    })
  
    if(response === false) {
        console.log("Hubo un error al procesar la petición") //Esto se visualizará en la consola del navegador
        alertMessage("Error: hubo un problema en el servidor", "error")
    }
    else {
        //Esto se visualizará en la consola del navegador
        console.log("El server proceso correctamente la petición")
        console.log(response)
        
        setAlumnoData(response.data)
        //setAlumnosList(response.data)
    }
  }

  useEffect(() => {
    getAlumno()
  }, [])

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
        <form className="px-4 my-32 max-w-3xl mx-auto space-y-6">      
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="name">Nombre del estudiante</label>
              <input type="text" name="nombre" className="border border-gray-100 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-1000" size="30" ref={input_name} defaultValue={alumnoData.nombre} />
            </div>
            
            <div>
              <label htmlFor="matricula">Matricula</label>
              <input type="text" name="matricula" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="6" maxLength="6" ref={input_matricula} defaultValue={alumnoData.matricula} />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div>
              <label htmlFor="carrera">Carrera</label>
              <input type="text" name="carrera" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="5" ref={input_carrera} defaultValue={alumnoData.carrera} />
            </div>

            <div>
              <label htmlFor="semestre">Semestre</label>
              <input type="text" name="semestre" className="border border-gray-100 block py-2 px-4 w-100 rounded focus:outline-none focus:border-teal-1000" size="5" ref={input_semestre} defaultValue={alumnoData.semestre} />
            </div>
          </div>
          
          
          <div>
            <label htmlFor="ciclo">Ciclo Escolar</label>
            <input type="text" name="ciclo" className="border border-gray-100 block py-2 px-4 w-120 rounded focus:outline-none focus:border-teal-1000" size="7" ref={input_cicloescolar} defaultValue={alumnoData.ciclo_escolar} />
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
              {
                alumnoData.notas.map((nota, index) => (
                  <tr key={index}>
                    <td><input type='text' className='input_class' defaultValue={nota.materia} /></td>
                    <td><input type='text' className='input_class' defaultValue={nota.calificacion} /></td>
                    <td><input type='text' className='input_class' defaultValue={nota.grado_dificultad} /></td>
                    <td><input type='text' className='input_class' defaultValue={nota.preferencia} /></td>
                    <td><input type='text' className='input_class' defaultValue={nota.tiempo_dedicado} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="px-2 py-6 flex justify-between bg-gray-250">
            <button type='button' className="bg-yellow-600 px-4 py-2 text-white rounded hover:bg-yellow-700" onClick={AddRow}>Añadir materia</button> 
            <button type='button' className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700" onClick={SendData}>Enviar</button> 
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
      props: {},
  };
}

export default Alumno