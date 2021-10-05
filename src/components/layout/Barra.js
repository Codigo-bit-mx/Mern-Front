import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    const authContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;

    useEffect(() =>{
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [])

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> : null}
            
        <nav className="nav-principal">
            <button
                className=" cerrar-sesion"
                onClick={() => cerrarSesion()}
            >Cerrar sesion
            </button>
        </nav>
        </header>
     );
}

export default Barra;