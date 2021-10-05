import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props}) => { // componente que toma valores de otro componente
    
    const authContext = useContext(AuthContext);
    const {cargando ,autenticado, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
         //eslint-disable-next-line
    }, [])

    return ( 

        <Route { ...props} render={ props => !autenticado && !cargando ? (
            <Redirect to ="/" /> //redireccion cuando se cierra sesion 
         ) : (
            <Component {...props} />
         )}
        
        />
    );
}
 
export default RutaPrivada;