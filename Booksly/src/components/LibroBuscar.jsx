import React from 'react';

function LibroCard({ libroInfo }) {
    const {
        title = 'Título no disponible',
        authors = ['Autor no disponible'],
        pageCount = 0,
        imageLinks,
        industryIdentifiers
    } = libroInfo;

    const urlImagen = imageLinks?.thumbnail || `https://placehold.co/300x450/fcebeb/ff758f?text=Sin+Portada`;
    const autores = authors.join(', ');
    const numPaginas = pageCount ? `${pageCount} págs.` : '';

    let isbn = 'ISBN no disp.';
    if (industryIdentifiers) {
        const isbn13 = industryIdentifiers.find(id => id.type === 'ISBN_13');
        isbn = isbn13 ? isbn13.identifier : (industryIdentifiers[0]?.identifier || 'ISBN no disp.');
    }

    return (
        <div className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="tarjeta-libro">
                <img src={urlImagen} alt={`Portada de ${title}`} />
                <div className="info-tarjeta-libro">
                    <h6 className="titulo-libro" title={title}>{title}</h6>
                    <p className="autor-libro">{autores}</p>
                    <div className="detalles-libro">
                        <span>{numPaginas}</span>
                        <span>{isbn}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LibroCard;
