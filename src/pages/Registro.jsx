import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

   import logo from '../assets/logo.png'; 
   import Navbar_Superior from '../components/Navbar';
   import { registrarUsuario } from '../services/ApiService'; 
   import '../styles/Registro-login.css';


import '../styles/Registro-login.css';

function Registro() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fechaNacimiento: ''
    });

    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (!formData.username || !formData.email || !formData.password || !formData.fechaNacimiento) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setCargando(true);

        try {
            const respuesta = await registrarUsuario({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fechaNacimiento: formData.fechaNacimiento
            });

            console.log("Registro exitoso:", respuesta);
            navigate('/login');

        } catch (err) {
            console.error("Error en registro:", err);
            setError("Hubo un error al crear la cuenta. Intenta nuevamente.");
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
                            <h1>Crear cuenta</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username">Nombre de usuario</label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        className="form-control" 
                                        placeholder="Ej: lector_infinito"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control" 
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className="form-control" 
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        className="form-control" 
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                                    <input 
                                        type="date" 
                                        id="fechaNacimiento" 
                                        className="form-control" 
                                        value={formData.fechaNacimiento}
                                        onChange={handleChange}
                                    />
                                </div>

                                {error && <div className="alert alert-danger mt-3">{error}</div>}

                                <button 
                                    type="submit" 
                                    className="btn btn-primary boton-formulario"
                                    disabled={cargando}
                                >
                                    {cargando ? 'Registrando...' : 'Crear cuenta'}
                                </button>

                                <div className="mt-3">
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