import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { login as apiLogin } from '../services/ApiService';
import { useAuth } from '../context/AuthContext';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const { setUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const userData = await apiLogin(email, password);

            if (userData) {
                login(userData); 
                navigate('/app/inicio');
            } else {
                setError('Correo electrónico o contraseña incorrectos.');
            }
        } catch (err) {
            setError('Ocurrió un error. Por favor, intenta de nuevo.');
        }
    };

    return (
        <main className="contenido-principal">
            <div className="contenedor-formulario">
                <div className="row">
                    <div className="col-4 columna-imagen">
                        <img src={logo} alt="Ilustración de un libro" />
                    </div>
                    <div className="col-8 columna-datos">
                        <h1>Bienvenido de vuelta</h1>
                        <form id="formulario-login" onSubmit={handleSubmit}>
                            <div className="grupo-formulario">
                                <label htmlFor="correo-usuario">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="correo-usuario"
                                    className="form-control"
                                    placeholder="Ingrese su correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grupo-formulario">
                                <label htmlFor="contrasena-usuario">Contraseña</label>
                                <input
                                    type="password"
                                    id="contrasena-usuario"
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button type="submit" className="btn btn-primary boton-formulario">
                                Iniciar Sesión
                            </button>

                            <p className="mt-3">¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;