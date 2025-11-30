import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLibrosUsuario } from '../services/ApiService.jsx';
import { useNavigate } from 'react-router-dom';
import TarjetaEstadistica from '../components/TarjetaEstadistica.jsx';
import ListaLibrosProgreso from '../components/ListaLibrosProgreso.jsx';
import '../styles/Estadisticas.css';

function Estadisticas() {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.id) { 
            const fetchLibros = async () => {
                try {
                    const data = await getLibrosUsuario(user.id);
                    
                    const librosConEstado = data.map(libro => {
                        const estaFinalizado = libro.status === 'finalizado' || (libro.totalPages > 0 && libro.currentPage === libro.totalPages);
                        return {
                            ...libro,
                            status: estaFinalizado ? 'finalizado' : 'leyendo'
                        };
                    });
                    
                    setLibros(librosConEstado);
                    
                } catch (err) {
                    setError('No se pudieron cargar los datos.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchLibros();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    }


    const librosFinalizados = libros.filter(l => l.status === 'finalizado');
    const librosEnCurso = libros.filter(l => l.status === 'leyendo' || l.status === 'pendiente');
    const totalPaginasLeidas = libros.reduce((acc, libro) => acc + (libro.currentPage || 0), 0);
    

    const paginasPorHora = 25; 

    if (loading) return <p className="mt-5 text-center">Calculando estadísticas...</p>;
    if (error) return <p className="mt-5 text-center text-danger">{error}</p>;

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Mi Progreso de Lectura</h1>
            <div className="row g-4 mb-5">
                <TarjetaEstadistica
                    icono="bi-book-fill"
                    valor={librosFinalizados.length}
                    etiqueta="Libros Terminados"
                />
                <TarjetaEstadistica
                    icono="bi-bookmarks-fill"
                    valor={totalPaginasLeidas.toLocaleString('es-ES')}
                    etiqueta="Páginas Leídas"
                />
                <TarjetaEstadistica
                    icono="bi-speedometer2"
                    valor={paginasPorHora}
                    etiqueta="Páginas / Hora (Est.)"
                />
            </div>

            <ListaLibrosProgreso titulo="Leyendo Actualmente" libros={librosEnCurso} />
            <hr className="my-5" />
            <ListaLibrosProgreso titulo="Biblioteca de Terminados" libros={librosFinalizados} />

            <div className="mt-5 d-lg-none text-center">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left me-2"></i> Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Estadisticas;