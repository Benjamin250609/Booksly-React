import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLibrosUsuario } from '../services/ApiService';
import LibroItem from '../components/Libro';
import Modal from '../components/Modal';

import '../styles/Principal.css';

function Principal() {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            async function fetchBooks() {
                try {
                    const userBooks = await getLibrosUsuario(user.id);
                    setBooks(userBooks);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
            fetchBooks();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleLibroAgregado = (nuevoLibro) => {
        setBooks(prevBooks => [nuevoLibro, ...prevBooks]);
    };
    
    if (loading) {
        return <div>Cargando tu estantería...</div>;
    }

    if (error) {
        return <div>Error al cargar tus libros: {error.message}</div>;
    }

    
return (
    <div className="contenedor-pagina-principal">
        <div className="fila-superior">
            <div className="tarjeta-bienvenida">
                <h1>¡Bienvenido de vuelta, {user?.nombre}!</h1>
                <p className="cita">"Un lector vive mil vidas antes de morir. Aquel que nunca lee vive solo una."</p>
            </div>
        </div>
        <div className="seccion-mis-libros">
            <h2 className="titulo-seccion">Mi Estantería</h2>
            <button type="button" className="boton-agregar-libro" onClick={() => setIsModalOpen(true)}>
                <i className="bi bi-plus-circle"></i> Agregar un Libro
            </button>
        </div>
        <div className="carrusel-libros">
            {books.length > 0 ? (
                books.map(book => (
                    <LibroItem key={book.id} book={book} />
                ))
            ) : (
                <p>Tu estantería está vacía. ¡Añade tu primer libro!</p>
            )}
        </div>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLibroAgregado={handleLibroAgregado}
        />
    </div>
);
}

export default Principal;