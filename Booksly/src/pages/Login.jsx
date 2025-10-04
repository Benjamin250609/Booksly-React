
import { Link } from 'react-router-dom';
import react from '../assets/react.svg';
import Navbar_Superior from '../components/Navbar';

function Login() {

    return (
        <>
            <Navbar_Superior />

            <main className="contenido-principal">
                <div className="contenedor-formulario">
                    <div className="row">
                        <div className="col-4 columna-imagen">

                            <img src={react} alt="Ilustración de un libro" />
                        </div>

                        <div className="col-8 columna-datos">
                            <h1>Bienvenido de vuelta</h1>

                            <form id="formulario-login">
                                <div className="grupo-formulario">
                                    <label htmlFor="correo-usuario">Correo Electrónico</label>
                                    <input type="email" id="correo-usuario" className="form-control" placeholder="Ingrese su correo" />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="contrasena-usuario">Contraseña</label>
                                    <input type="password" id="contrasena-usuario" className="form-control" placeholder="Ingrese su contraseña" />
                                </div>

                                <p><a href="#">¿Olvidaste tu contraseña?</a></p>

                                <div id="mensaje" className="mb-3"></div>

                                <button type="submit" className="btn btn-primary boton-formulario">Iniciar Sesión</button>

                                <p className="mt-3">¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>


        </>

    );
}

export default Login;