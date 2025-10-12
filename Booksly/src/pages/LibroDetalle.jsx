import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLibrosUsuario } from '../services/ApiService'; 
import { useAuth } from '../context/AuthContext';


import LibroEncabezado from '../components/EncabezadoDetalle';
import LibroEstadisticas from '../components/EstadisticasDetalle';
import SesionLectura from '../components/SesionDetalle';


import '../styles/LibroDetalle.css';

function LibroDetalle() {
    const { id } = useParams();
    const { user } = useAuth();
    const [libro, setLibro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibro = async () => {
            if (!user) {
                setError("Debes iniciar sesión para ver tus libros.");
                setLoading(false);
                return;
            }
            try {
                const librosUsuario = await getLibrosUsuario(user.id);
                const libroEncontrado = librosUsuario.find(l => l.id === parseInt(id));
                if (libroEncontrado) {
                    setLibro(libroEncontrado);
                } else {
                    setError('Libro no encontrado.');
                }
            } catch (err) {
                setError('Error al cargar los datos del libro.');
            } finally {
                setLoading(false);
            }
        };

        fetchLibro();
    }, [id, user]);

    
    const guardarCambiosLibro = (libroActualizado) => {
        console.log("Guardando cambios (simulado):", libroActualizado);
        setLibro(libroActualizado);
    };

    if (loading) return <div className="vista-carga">Cargando detalles del libro...</div>;
    if (error) return <div className="vista-error">{error}</div>;
    if (!libro) return <div className="vista-error">No se pudo encontrar el libro.</div>;

    return (
        <div className="libro-detalle-container">
            <Link to="/app/inicio" className="enlace-volver"><i className="bi bi-arrow-left"></i> Volver a Mis Libros</Link>
            
            <LibroEncabezado libro={libro} />
            <LibroEstadisticas libro={libro} />
            <SesionLectura libro={libro} onGuardarCambios={guardarCambiosLibro} />
        </div>
    );
}

export default LibroDetalle;
