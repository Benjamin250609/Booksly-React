import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLibrosUsuario, actualizarProgreso } from '../services/ApiService'; 
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

    // Cargar el libro al entrar
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
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLibro();
    }, [id, user]);

    const guardarCambiosLibro = async (libroConNuevosDatos) => {
        try {
            const progresoDTO = {
                currentPage: libroConNuevosDatos.currentPage,
                timeReadInMinutes: libroConNuevosDatos.timeReadInMinutes,
                status: libroConNuevosDatos.status
            };

            console.log("Enviando a Backend:", progresoDTO);

            const libroActualizadoDesdeBD = await actualizarProgreso(libro.id, progresoDTO);

            setLibro(libroActualizadoDesdeBD);
            
            console.log("¡Guardado exitoso en BD!");

        } catch (err) {
            console.error("Error al guardar el progreso:", err);
            alert("No se pudo guardar el progreso. Revisa tu conexión.");
        }
    };

    if (loading) return <div className="vista-carga">Cargando detalles del libro...</div>;
    if (error) return <div className="vista-error">{error}</div>;
    if (!libro) return <div className="vista-error">No se pudo encontrar el libro.</div>;

    return (
        <div className="libro-detalle-container">
            <Link to="/app/inicio" className="enlace-volver">
                <i className="bi bi-arrow-left"></i> Volver a Mis Libros
            </Link>
            
            <LibroEncabezado libro={libro} />
            <LibroEstadisticas libro={libro} />
            
            <SesionLectura libro={libro} onGuardarCambios={guardarCambiosLibro} />
        </div>
    );
}

export default LibroDetalle;