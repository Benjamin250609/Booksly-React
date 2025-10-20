import { Link } from 'react-router-dom';
import react from '../assets/react.svg';
import Navbar_Superior from '../components/Navbar';


import '../styles/Registro-login.css'

function Registro() {
    return (

        <>
            <Navbar_Superior />

            <main className="layout-formulario-centrado">
                <div className="contenedor-formulario">
                    <div className="row">
                        <div className="col-4 columna-imagen">
                            <img src={react} alt="Ilustración de un libro" />
                        </div>

                        <div className="col-8 columna-datos">
                            <h1>Crea tu cuenta</h1>
                            <form id="formulario-registro">
                                <div className="grupo-formulario">
                                    <label htmlFor="nombre-usuario">Nombre de usuario</label>
                                    <input type="text" id="nombre-usuario" className="form-control" placeholder="Ingrese su nombre de usuario" />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="correo-usuario">Correo Electrónico</label>
                                    <input type="email" id="correo-usuario" className="form-control" placeholder="Ingrese su correo" />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="contrasena-usuario">Contraseña</label>
                                    <div className="envoltura-contrasena">
                                        <input type="password" id="contrasena-usuario" className="form-control" placeholder="Ingrese su Contraseña" />
                                        <i className="bi bi-eye-slash" id="icono-ojo-contrasena"></i>
                                    </div>
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="confirmar-contrasena">Confirmar Contraseña</label>
                                    <input type="password" id="confirmar-contrasena" className="form-control" placeholder="Vuelva a ingresar su Contraseña" />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
                                    <input type="date" id="fecha-nacimiento" className="form-control" />
                                </div>

                                <div id="mensaje" className="mb-3"></div>
                                <button type="submit" className="btn btn-primary boton-formulario">Crear cuenta</button>

                                <div>
                                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

export default Registro;