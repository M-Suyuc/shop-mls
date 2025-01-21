'use client'
import { useEffect, useState } from 'react'

// Componente de página
const MiPagina = () => {
  const [datos, setDatos] = useState(null)
  console.log(datos)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/index.json')
        if (respuesta.ok) {
          const datosRecuperados = await respuesta.json()
          setDatos(datosRecuperados)
        } else {
          console.error('Error al recuperar datos:', respuesta.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div className='size-[500px] bg-red-600'></div>
      {/* {JSON.stringify(datos, null, 2)} */}
    </>
  )
}

export default MiPagina
