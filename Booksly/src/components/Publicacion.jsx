import React from 'react';
import { Link } from 'react-router-dom';


function Publicacion({ post }) {

    return (
        <>
            <div className="publicacion-feed mb-4">
                <div className="encabezado-publicacion">
                    <img src={post.avatar} alt={`Avatar de ${post.usuario}`} className="avatar-publicacion" />
                    <div className="info-usuario-publicacion">
                        <Link to="#"><strong>{post.usuario}</strong></Link> {post.accion}
                        <div className="text-muted small">{post.tiempo}</div>
                    </div>
                </div>
                <div className="contenido-publicacion">
                    <div className="info-libro-publicacion">
                        <img src={post.libro.portada} alt={`Portada de ${post.libro.titulo}`} className="portada-libro-pequena" />
                        <div>
                            <strong>{post.libro.titulo}</strong>
                            <div className="text-muted">{post.libro.autor}</div>
                        </div>
                    </div>
                </div>
                <div className="acciones-publicacion">
                    <Link to="#" className="boton-like">
                        <i className="bi bi-heart"></i>
                        <i className="bi bi-heart-fill"></i> Me gusta
                    </Link>
                    <Link to="#">
                        <i className="bi bi-chat"></i> Comentar
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Publicacion;