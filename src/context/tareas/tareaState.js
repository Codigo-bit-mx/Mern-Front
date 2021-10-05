import React, {useReducer} from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import { TAREAS_PROYECTO,
         AGREGAR_TAREA,
         VALIDAR_TAREA,
         ELIMINAR_TAREA,
         TAREA_ACTUAL,
         ACTUALIZAR_TAREA, 
         LIMPIAR_TAREA
} from '../../types/index';

 
const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaselecionada: null
    }
    // crear dispach y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones
    //obtener las tareas de un proyecto 
    const obtenerTareas = async proyecto => {
     try{
        const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
        
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas 
     })  
     } catch(error){
         console.log(error);
     }   
    }

    //agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
       
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA, 
                payload: tarea 
            })
        } catch (error) {
            console.log(error);    
        }
    }

    //VALIDAR Y MOSTRAR UN ERROR EN CASO NECESARIO
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    //eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //actualiza la tarea una vez editada
    const actualizarTarea = async (tarea) => {
       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
          dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tareaExiste
        })
      } catch (error) {
        console.log(error);
      }
    }

    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Limpiar la tarea del formTarea
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

return(

    <tareaContext.Provider
        value = {{    
            // tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaselecionada: state.tareaselecionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}
    >
        {props.children}
    </tareaContext.Provider>

 )
}

export default TareaState;