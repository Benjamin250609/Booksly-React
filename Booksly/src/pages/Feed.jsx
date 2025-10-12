import React, { useState, useEffect } from 'react';
import Publicacion from "../components/Publicacion";
import { getPosts } from "../services/ApiService";

import "../styles/feed_estilo.css"


function Feed() {
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function buscarPosts() {
            try{
                const datos = await getPosts();
                setPosts(datos);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            } 
        }

        buscarPosts();
    },[]);

    if (loading) {
        return <div>Cargando posts...</div>;
    }

    if (error) {
      return <div>Error al cargar los posts: {error.message}</div>;
    }

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Feed de la Comunidad</h1>
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    {posts.map(post => (
                        <Publicacion key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Feed;