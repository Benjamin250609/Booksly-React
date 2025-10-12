import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getLibrosUsuario } from '../services/ApiService.jsx';
import TarjetaEstadistica from '../components/TarjetaEstadistica.jsx';
import ListaLibrosProgreso from '../components/ListaLibrosProgreso.jsx';
import '../styles/Estadisticas.css';

function Estadisticas() {
    const { user } = useAuth();
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchLibros = async () => {
                try {
                    const data = await getLibrosUsuario(user.id);
                    
                    const librosConEstado = data.map(libro => {
                        
                        const estaFinalizado = libro.totalPages > 0 && libro.currentPage === libro.totalPages;
                        
                        return {
                            ...libro,
                            status: estaFinalizado ? 'finalizado' : 'leyendo'
                        };
                    });
                    
                    setLibros(librosConEstado);
                    
                } catch (err) {
                    setError('No se pudieron cargar los datos de los libros.');
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

    
    const librosFinalizados = libros.filter(l => l.status === 'finalizado');
    const librosEnCurso = libros.filter(l => l.status === 'leyendo');
    const totalPaginasLeidas = libros.reduce((acc, libro) => acc + (libro.currentPage || 0), 0);
    const paginasPorHora = 30; 

    if (loading) {
        return <p>Cargando tus estadísticas...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

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
                    etiqueta="Páginas / Hora"
                />
            </div>

            <ListaLibrosProgreso titulo="Libros en Curso" libros={librosEnCurso} />
            <hr className="my-5" />
            <ListaLibrosProgreso titulo="Libros Finalizados" libros={librosFinalizados} />
        </div>
    );
}

export default Estadisticas;