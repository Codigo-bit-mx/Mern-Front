import React, {Fragment, useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //estado -> state
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    //extracion del nombre del proyecto 
    const {nombre} = proyecto;
    //lee los contenidos
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,  //->> copia del estado
            [e.target.name] : e.target.value //--> guardar los nuevos valores 
        })
    }
    //envio de informacion del proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();
        //validar el formulario
        if(nombre === ''){
            mostrarError()
            return null;
        }
        //agregar al estado o state
        agregarProyecto(proyecto);

        //reiniar el formulario
        guardarProyecto({
            nombre: ''
        })
    }

    const onclickFormulario = () =>{
        mostrarFormulario();  
    }


    return ( 
        <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onclickFormulario}
            >Nuevo Proyecto</button>
            
        
            { formulario ? 
            
            (    <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>

            <input 
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
            />
            <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar Proyecto"
            />
            </form> ) : null }

            { errorformulario ? (<p className="mensaje error">El nombre del proyecto es obligatorio</p>) : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;