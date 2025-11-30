import React, { useState, useEffect } from 'react';
import Publicacion from "../components/Publicacion";
import CrearPostModal from "../components/CrearPostModal";
import { getPosts, crearPost } from "../services/ApiService";
import '../styles/feed_estilo.css';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cargarFeed = async () => {
        setLoading(true); 
        setError(null);   
        
        try {
            const datos = await getPosts();
            setPosts(datos);
        } catch (err) {
            console.error("Error cargando feed:", err);
            setError("No se pudo conectar con el servidor. Verifica tu conexión o que las IPs en ApiService sean las correctas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarFeed();
    }, []);

    const handleCrearPost = async (nuevoPostDTO) => {
        try {
            await crearPost(nuevoPostDTO);
            await cargarFeed(); 
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error al crear post:", err);
            alert("Error al crear la publicación");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
                <button className="btn btn-outline-primary" onClick={cargarFeed}>
                    <i className="bi bi-arrow-clockwise me-2"></i> Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h1>Feed de la Comunidad</h1>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Crear Publicación
                </button>
            </div>

            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <Publicacion key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <div className="display-1 text-muted">📝</div>
                            <p className="mt-3 text-muted">Nadie ha publicado nada aún.</p>
                            <p>¡Sé el primero en compartir tu lectura!</p>
                        </div>
                    )}
                </div>
            </div>

            <CrearPostModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onPostSubmit={handleCrearPost}
            />
        </div>
    );
}

export default Feed;