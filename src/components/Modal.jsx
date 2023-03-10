import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'


const Modal = ({setModal,animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

  const [mensaje, setMensaje] = useState('')
  const [nombre, setnombre] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if ( Object.keys(gastoEditar).length >0){
      setnombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const ocultarModal = () => {
    setAnimarModal(false)
    setGastoEditar=({})
    setTimeout(()=>{
      setModal(false)
    }, 500)
  }

  const handelSubmit = e => {
      e.preventDefault();
      // en este caso usamos el metodo includes para validar con tres campos del formulario
      // este metodo lo que hace es recorrer cada uno de los capos del arreglo y si uno esta vacio no muestra error ya que el valor es vacio
      if([nombre,cantidad,categoria].includes('')){
        setMensaje('Todos los campos son obligatorios')

        setTimeout(() => {
          setMensaje('')
        }, 3000);
        return;
      }
      guardarGasto({nombre,cantidad,categoria,id,fecha})
  }

  return (
    <div className="modal">
        <div className="cerrar-modal">
          <img 
            src={CerrarBtn} 
            alt="cerrar modal" 
            onClick={ocultarModal}
          />
        </div>
        <form 
        onSubmit={handelSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar' }`}>
          <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className='campo'>
              <label htmlFor="nombre">Nombre Gasto</label>

              <input
                id='nombre'
                type='text'
                placeholder='A??ade el Nombre del Gasto'
                value={nombre}
                onChange={(e) => setnombre(e.target.value)}
              />
          </div>
          <div className='campo'>
              <label htmlFor="cantidad">Cantidad</label>

              <input
                id='cantidad'
                type='number'
                placeholder='A??ade la cantidad del Gasto'
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
          </div>
          <div className='campo'>
              <label htmlFor="Categoria">Categoria</label>

              <select 

              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}

              >
                  <option value="">-- Seleccione --</option>
                  <option value="ahorro">Ahorro</option>
                  <option value="comida">Comida</option>
                  <option value="casa">Casa</option>
                  <option value="gastos">Gastos Varios</option>
                  <option value="ocio">Ocio</option>
                  <option value="salud">Salud</option>
                  <option value="suscripciones">Suscripciones</option>
              </select>
          </div>

          <input 
          type="submit"
          value={gastoEditar.nombre ? 'Guardar Cambios' : 'A??adir Gasto'}
          className="boton"
         
          
          />
        </form>
    </div>
  )
}

export default Modal