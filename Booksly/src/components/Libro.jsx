import React from 'react';
import { Link } from 'react-router-dom';


function LibroItem({ book }) { 
    return (
        <Link to={`/app/libro/${book.id}`}>
            <div className="elemento-libro">
                <img src={book.cover} alt={`Portada de ${book.title}`} />
            </div>
        </Link>
    );
}

export default LibroItem;