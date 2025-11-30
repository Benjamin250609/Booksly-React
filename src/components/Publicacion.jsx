import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { darLike, comentarPost } from '../services/ApiService'; 

function Publicacion({ post }) {
    const { user } = useAuth();
    
    
    const [likesCount, setLikesCount] = useState(post.likes || 0);
    const [comments, setComments] = useState(post.comentarios || []);
    
    const [liked, setLiked] = useState(false); 
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [enviando, setEnviando] = useState(false);


    const handleLike = async () => {
        if (liked) return; 

        try {

            setLiked(true);
            setLikesCount(prev => prev + 1);


            await darLike(post.id);
        } catch (error) {
            console.error("Error al dar like:", error);
            setLiked(false);
            setLikesCount(prev => prev - 1);
        }
    };

  
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        
        const nombreUsuario = user ? user.username : "Anónimo";

        setEnviando(true);

        try {
            const comentarioDTO = {
                usuario: nombreUsuario,
                texto: newComment
            };

           
            await comentarPost(post.id, comentarioDTO);

           
            const nuevoComentarioVisual = {
                id: Date.now(), 
                usuario: nombreUsuario,
                texto: newComment,
                tiempo: "Ahora"
            };
            
            setComments([...comments, nuevoComentarioVisual]);
            setNewComment('');

        } catch (error) {
            console.error("Error al comentar:", error);
            alert("No se pudo enviar el comentario.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="publicacion-feed mb-4">
            <div className="encabezado-publicacion">
                <img 
                    src={post.avatar || `https://ui-avatars.com/api/?name=${post.usuario}&background=random`} 
                    alt={`Avatar de ${post.usuario}`} 
                    className="avatar-publicacion" 
                />
                <div className="info-usuario-publicacion">
                    <Link to="#"><strong>{post.usuario}</strong></Link> 
                    <span className="mx-1 text-muted">•</span> 
                    <span className="accion-texto">{post.accion}</span>
                    <div className="text-muted small">{post.tiempo}</div>
                </div>
            </div>
            

            <div className="contenido-publicacion">
                {post.libro && (
                    <div className="info-libro-publicacion mb-3">
                        <img 
                            src={post.libro.portada} 
                            alt={`Portada de ${post.libro.titulo}`} 
                            className="portada-libro-pequena" 
                        />
                        <div className="detalles-libro-feed">
                            <strong>{post.libro.titulo}</strong>
                            <div className="text-muted">{post.libro.autor}</div>
                        </div>
                    </div>
                )}
            </div>
            

            <div className="acciones-publicacion">
                <button 
                    className={`btn-accion ${liked ? 'liked' : ''}`} 
                    onClick={handleLike}
                >
                    <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    <span>{likesCount > 0 ? likesCount : ''} Me gusta</span>
                </button>
                
                <button 
                    className="btn-accion" 
                    onClick={() => setShowComments(!showComments)}
                >
                    <i className="bi bi-chat"></i>
                    <span>{comments.length > 0 ? comments.length : ''} Comentar</span>
                </button>
            </div>


            {showComments && (
                <div className="seccion-comentarios">
                    <div className="lista-comentarios">
                        {comments.length === 0 && (
                            <p className="text-muted text-center small my-2">Sé el primero en comentar.</p>
                        )}
                        {comments.map((c, index) => (
                            <div key={c.id || index} className="item-comentario">
                                <strong>{c.usuario}:</strong> {c.texto}
                                {c.tiempo && <span className="text-muted small ms-2">({c.tiempo})</span>}
                            </div>
                        ))}
                    </div>

                    
                    <form onSubmit={handleSubmitComment} className="input-comentario-wrapper">
                        <input 
                            type="text" 
                            placeholder="Escribe un comentario..." 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={enviando}
                        />
                        <button type="submit" disabled={!newComment.trim() || enviando}>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Publicacion;