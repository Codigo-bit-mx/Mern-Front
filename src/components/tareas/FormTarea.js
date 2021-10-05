import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareaselecionada, errortarea ,agregarTarea, validarTarea, obtenerTareas, 
            actualizarTarea, limpiarTarea } = tareasContext;

    //useEffect que detecta la edicion de alguna tarea
    useEffect(() => {
        if(tareaselecionada !== null) {
            guardarTarea(tareaselecionada);
        }else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaselecionada])

    //STATE del formulario es local
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })
    //extraer el nombre
    const { nombre } = tarea;

    if(!proyecto) return null;
    const [proyectoActual] = proyecto;
   
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
        //pasar validacion
        if(tareaselecionada === null){
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
            
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }   
       
        obtenerTareas(proyectoActual._id); // se coloca el guion bajo para saber que es un id de mongo
       
        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >  
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value= {tareaselecionada ? "Editar tarea": "Agregar Tarea" }
                    />
                </div>
            </form>

            { errortarea ? <p className="mensaje error"> El nombre de la tarea es obligatorio </p>: null}
        </div>

     );
}
 
export default FormTarea;