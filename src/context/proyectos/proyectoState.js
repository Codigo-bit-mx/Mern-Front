import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
        } from '../../types/index';

        import clienteAxion from '../../config/axios';

const ProyectoState = props => {
   
    const initialState = {
       proyectos : [],
       formulario : false, 
       errorformulario: false,
       proyecto: null,
       mensaje: null
    }
    //dispach para ejecutar las acciones en proyectoReducer
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

//obtener los proyectos
    const obtenerProyectos = async () => {
       try {
           const proyectos = await clienteAxion.get('/api/proyectos');

        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos.data.proyectos
        })
       } catch (error) {
        const alerta = {
            msg : 'Hubo un error',
            categoria : 'alerta-error'
        }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
    }

 //Agregar un nuevo proyecto 
    const agregarProyecto = async proyecto => {
     
        try{
            const resultado = await clienteAxion.post('/api/proyectos', proyecto);
            dispatch({
                type:  AGREGAR_PROYECTO,
                payload: resultado.data
            })             

        }catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

 //mostrar un error al agregar un proyecto
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

 //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
 //eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
     
        try {
            await clienteAxion.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
   
   
    }

    return (
        <proyectoContext.Provider
            value = {{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos, 
                agregarProyecto, 
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
    
}

export default ProyectoState;