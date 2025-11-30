import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import Navbar_Superior from '../components/Navbar';
import { login as apiLogin } from '../services/ApiService'; 
import { useAuth } from '../context/AuthContext';

import '../styles/Registro-login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setCargando(true);

        try {
            const userData = await apiLogin(email, password);
            console.log("Login exitoso:", userData);
            login(userData);
            navigate('/app/inicio');

        } catch (err) {
            console.error("Error en login:", err);
            if (err.response && err.response.status === 401) {
                setError("Credenciales incorrectas. Inténtalo de nuevo.");
            } else {
                setError("Error al iniciar sesión. Intenta más tarde.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Navbar_Superior />
            <main className="container-fluid layout-formulario-centrado modo-login">
                <div className="row contenedor-formulario">
                    
                    <div className="col-md-5 columna-imagen d-none d-md-flex">
                        <img src={logo} alt="Logo Booksly" className="img-fluid" />
                    </div>

                    <div className="col-md-7 columna-datos">
                        <div className="w-100"> 
                            <h1>¡Hola de nuevo!</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email-usuario">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email-usuario"
                                        className="form-control"
                                        placeholder="nombre@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contrasena-usuario">Contraseña</label>
                                    <input
                                        type="password"
                                        id="contrasena-usuario"
                                        className="form-control"
                                        placeholder="Tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <div className="alert alert-danger mt-3">{error}</div>}

                                <button 
                                    type="submit" 
                                    className="btn btn-primary boton-formulario"
                                    disabled={cargando}
                                >
                                    {cargando ? 'Entrando...' : 'Iniciar Sesión'}
                                </button>

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