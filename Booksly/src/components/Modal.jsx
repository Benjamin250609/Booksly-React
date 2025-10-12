import React, { useState, useEffect } from 'react';

import { searchGoogleBooks } from '../services/ApiService';

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
            id: `new-${Date.now()}`, // ID único temporal
            title,
            author,
            totalPages: parseInt(totalPages, 10),
            currentPage: 0,
            cover: cover || `https://placehold.co/180x260/fcebeb/ff758f?text=${title.replace(/\s/g, '+')}`,
            status: 'leyendo'
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

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={limpiarFormularioYcerrar} className="modal-close-button">&times;</button>
                <h2>Añadir un nuevo libro</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grupo-formulario">
                        <label htmlFor="isbn">Buscar por ISBN (Opcional)</label>
                        <input
                            type="text"
                            id="isbn"
                            placeholder="Escribe el ISBN y el formulario se autocompletará..."
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                        {buscando && <small>Buscando...</small>}
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
                            {cover ? <img src={cover} alt="Vista previa de la portada" /> : <div className="placeholder-portada">Portada</div>}
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

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