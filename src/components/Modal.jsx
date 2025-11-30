import React, { useState, useEffect } from 'react';
import { searchGoogleBooks } from '../services/ApiService';
import '../styles/Modal.css'; 

function Modal({ isOpen, onClose, onLibroAgregado }) {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [cover, setCover] = useState('');
    
    const [buscando, setBuscando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isbn.length === 10 || isbn.length === 13) {
                handleBusquedaIsbn();
            }
        }, 500); 
        return () => clearTimeout(timer);
    }, [isbn]);

    const handleBusquedaIsbn = async () => {
        if (!isbn) return;
        setBuscando(true);
        setError('');
        try {
            const data = await searchGoogleBooks(`isbn:${isbn}`);
            if (data.items && data.items.length > 0) {
                const bookInfo = data.items[0].volumeInfo;
                setTitle(bookInfo.title || '');
                setAuthor(bookInfo.authors ? bookInfo.authors.join(', ') : '');
                setTotalPages(bookInfo.pageCount || '');
                setCover(bookInfo.imageLinks?.thumbnail || '');
            } else {
                setError('No se encontró ningún libro con ese ISBN.');
            }
        } catch (err) {
            setError('Error al buscar el libro.');
            console.error(err);
        } finally {
            setBuscando(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !author || !totalPages) {
            setError('Por favor, completa al menos el título, autor y número de páginas.');
            return;
        }

        const nuevoLibro = {
            title,
            author,
            totalPages: parseInt(totalPages, 10),
            cover: cover || `https://placehold.co/180x260/fcebeb/ff758f?text=${title.replace(/\s/g, '+')}`
        };

        onLibroAgregado(nuevoLibro);
        limpiarFormularioYcerrar();
    };

    const limpiarFormularioYcerrar = () => {
        setIsbn('');
        setTitle('');
        setAuthor('');
        setTotalPages('');
        setCover('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={limpiarFormularioYcerrar} className="modal-close-button">&times;</button>
                <h2>Añadir un nuevo libro</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grupo-formulario">
                        <label htmlFor="isbn">Buscar por ISBN (Opcional)</label>
                        <input
                            type="text"
                            id="isbn"
                            placeholder="Escribe el ISBN para autocompletar..."
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                        {buscando && <small className="text-muted">Buscando...</small>}
                    </div>

                    <div className="grupo-formulario">
                        <label htmlFor="titulo">Título del Libro</label>
                        <input type="text" id="titulo" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="grupo-formulario">
                        <label htmlFor="autor">Autor</label>
                        <input type="text" id="autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>

                    <div className="grupo-formulario">
                        <label htmlFor="paginas">Número de páginas</label>
                        <input type="number" id="paginas" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} required />
                    </div>

                    <div className="grupo-formulario">
                        <label>Portada del Libro</label>
                        <div className="preview-portada">
                            {cover ? <img src={cover} alt="Vista previa" /> : <div className="placeholder-portada">Sin Portada</div>}
                        </div>
                        <input 
                            type="text" 
                            placeholder="URL de la imagen (opcional)" 
                            value={cover} 
                            onChange={(e) => setCover(e.target.value)}
                            style={{ marginTop: '10px', fontSize: '0.8rem', width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e9ecef' }}
                        />
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" onClick={limpiarFormularioYcerrar} className="btn-secondary">Cancelar</button>
                        <button type="submit" className="btn-primary">Guardar Libro</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;