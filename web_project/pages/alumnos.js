import React, { useEffect, useState } from 'react'
import { alertMessage, handleAsyncReq } from '../lib/util'
import { AiFillDelete, AiFillFile } from 'react-icons/ai';
import Link from 'next/link'

function Alumnos() {
  const [alumnosList, setAlumnosList] = useState([])

  async function removeAlumno(e, matricula) {
    let response = await handleAsyncReq('/api/alumno/delete/' + matricula, {
      method: 'DELETE',
    })

    if(response === false) {
      console.log("Hubo un error al procesar la petición") //Esto se visualizará en la consola del navegador
      alertMessage("Error: hubo un problema en el servidor", "error")
    }
    else {
      //Esto se visualizará en la consola del navegador
      console.log("El server proceso correctamente la petición")
      //e.currentTarget.parentElement.parentElement.remove()
      const newAlumnos = alumnosList.filter(
        (alumno) => alumno.matricula !== matricula
      )

      setAlumnosList(newAlumnos)

      alertMessage("Listo", "success")
    }
  }

  async function getAlumnos() {
    let response = await handleAsyncReq('/api/alumnos', {
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
      
      setAlumnosList(response.data)
    }
  }

  useEffect(() => {
    getAlumnos()
  }, [])

  return (
    <div className='bg-gray-100'>
      <div className='w-full h-screen border mt-5 py-2 px-2'>
        <div className='flex justify-end gap-x-2'>
          <Link href='/'>
            <a className='bg-green-500 h-10 py-2 px-2 text-white rounded'>Nuevo Tutelado</a>
          </Link>
        </div>
        <div className='mt-4'>
          <table className='border-solid border-2 border-[#333]  border-collapse w-full'>
            <thead className='bg-[#333] text-white'>
              <tr>
                <th className='text-left px-2 py-2'>Matrícula</th>
                <th className='text-left px-2 py-2'>Periodo</th>
                <th className='text-left px-2 py-2'>Nombre</th>
                <th className='text-left px-2 py-2'>Editar</th>
                <th className='text-left px-2 py-2'>Eliminar</th>
              </tr>
            </thead>
                <tbody className='alumnos_tbody'>
                  {
                    alumnosList.map((alumno) => (
                      <tr key={alumno.matricula}>
                        <td>{alumno.matricula}</td>
                        <td>{alumno.ciclo_escolar}</td>
                        <td>{alumno.nombre}</td>
                        <td className='text-green-600'><Link href={`/alumno/${alumno._id}`}><button><AiFillFile /></button></Link></td>
                        <td className='text-red-500'><button onClick={(e) => removeAlumno(e, alumno.matricula)}><AiFillDelete /></button></td>
                      </tr>
                    ))
                  }
                </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Alumnos