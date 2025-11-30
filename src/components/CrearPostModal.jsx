import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLibrosUsuario } from '../services/ApiService';
import '../styles/Modal.css';

function CrearPostModal({ isOpen, onClose, onPostSubmit }) {
    const { user } = useAuth();
    const [libros, setLibros] = useState([]);
    const [loadingLibros, setLoadingLibros] = useState(false);
    
    const [libroSeleccionadoId, setLibroSeleccionadoId] = useState('');
    const [accion, setAccion] = useState('terminó de leer');
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && user) {
            setLoadingLibros(true);
            getLibrosUsuario(user.id)
                .then(data => setLibros(data))
                .catch(err => console.error("Error cargando libros:", err))
                .finally(() => setLoadingLibros(false));
        }
    }, [isOpen, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!libroSeleccionadoId) {
            setError("Por favor selecciona un libro.");
            return;
        }

        const libroCompleto = libros.find(l => l.id === parseInt(libroSeleccionadoId));

        const nuevoPost = {
            userId: user.id,
            usuarioNombre: user.username, 
            
            libroTitulo: libroCompleto.title,
            libroAutor: libroCompleto.author,
            libroPortada: libroCompleto.cover,
            
            accion: accion,
            comentario: comentario
        };

        onPostSubmit(nuevoPost);
        limpiarYcerrar();
    };

    const limpiarYcerrar = () => {
        setLibroSeleccionadoId('');
        setAccion('terminó de leer');
        setComentario('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={limpiarYcerrar} className="modal-close-button">&times;</button>
                <h2>Crear Publicación</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grupo-formulario">
                        <label>¿De qué libro quieres hablar?</label>
                        {loadingLibros ? (
                            <p className="text-muted">Cargando tus libros...</p>
                        ) : (
                            <select 
                                className="form-select" 
                                value={libroSeleccionadoId} 
                                onChange={(e) => setLibroSeleccionadoId(e.target.value)}
                                required
                            >
                                <option value="">-- Selecciona un libro --</option>
                                {libros.map(libro => (
                                    <option key={libro.id} value={libro.id}>
                                        {libro.title}
                                    </option>
                                ))}
                            </select>
                        )}
                        {libros.length === 0 && !loadingLibros && (
                            <small className="text-danger">No tienes libros. ¡Agrega uno primero en Inicio!</small>
                        )}
                    </div>

                    <div className="grupo-formulario">
                        <label>¿Qué pasó?</label>
                        <select 
                            className="form-select" 
                            value={accion} 
                            onChange={(e) => setAccion(e.target.value)}
                        >
                            <option value="comenzó a leer">Comencé a leer</option>
                            <option value="está leyendo">Estoy leyendo</option>
                            <option value="terminó de leer">Terminé de leer</option>
                            <option value="abandonó">Abandoné</option>
                            <option value="recomienda">Recomiendo</option>
                        </select>
                    </div>

                    <div className="grupo-formulario">
                        <label>Tu comentario (Opcional)</label>
                        <textarea 
                            className="form-control" 
                            rows="3" 
                            placeholder="¿Qué te pareció? Cuéntale a tus amigos..."
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        ></textarea>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" onClick={limpiarYcerrar} className="btn-secondary">Cancelar</button>
                        <button type="submit" className="btn-primary" disabled={!libroSeleccionadoId}>Publicar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearPostModal;