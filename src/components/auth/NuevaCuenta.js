import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom"; //enlace hacia nueva cuenta
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {

    //extraer los valores de la alertaContext
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext; 

    //extraer los calores del authcontext
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado,registrarUsuario } = authContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


    //state o estado
    const [usuario, guardarUsuario] = useState ({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //extraccion de datos del state
    const { nombre, email, password, confirmar } = usuario;


    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //validar campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //password iguales 
        if(password.length < 6 ){
            mostrarAlerta('El password debe contener 6 caracteres', 'alerta-error');
            return;
        }
        //los revisar si los dos password son iguales 
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
        }

        //action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit = {onSubmit}
                >

                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu Nombre"
                        value={nombre}
                        onChange={onChange}
                    />
                    </div>

                    <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu email"
                        value={email}
                        onChange={onChange}
                    />
                    </div>

                    <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu Password"
                        value={password}
                        onChange={onChange}
                    />
                    </div>

                    <div className="campo-form">
                    <label htmlFor="confirmar">Confirma tu password</label>
                    <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Confima el password"
                        value={confirmar}
                        onChange={onChange}
                    />
                    </div>
                    
                    <div className="campo-form">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Registrar"
                    />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta"> 
                    Regresar al inicio de sesion
                </Link>
            </div>

        </div>

     );
}
 
export default Login;