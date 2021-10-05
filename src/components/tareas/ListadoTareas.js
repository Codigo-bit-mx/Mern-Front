import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {
    // extraccion de proyectos desde el state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto} = proyectosContext;

      //obtener el state de proyectos context de tareaContex
      const tareasContext = useContext(tareaContext);
      const {tareasproyecto} = tareasContext;

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>
    // destructuracion para extraer el proyecto actual 
    const [ proyectoActual ] = proyecto;

    const onclickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 ? (<li className="tarea"><p>No hay tareas</p></li>) 
                : 
                <TransitionGroup>
                {tareasproyecto.map((tarea, index) => (
                        <CSSTransition
                            key={index}
                            timeout={200}
                            classNames="tarea" 
                        >
                        <Tarea 
                            key={index}
                            tarea={tarea}
                        />
                        </CSSTransition>
                ))} 
                </TransitionGroup>
                }
            </ul>

            <button type="button" className="btn btn-eliminar" onClick={onclickEliminar}>
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;