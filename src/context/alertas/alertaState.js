import React, { useReducer } from 'react';
import alertaReducer from '../../context/alertas/alertaReducer';
import alertaContext from '../../context/alertas/alertaContext';

import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index';

const AlertaState = props =>  {

    const initialState = {
        alerta: null
    }

    const [ state, dispach ] = useReducer(alertaReducer, initialState); 

    const mostrarAlerta = (msg, categoria) => {
        dispach({
            type: MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        });
        // despues de 5 segundos eliminar la alerta
        setTimeout( () => {
            dispach({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }



    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;