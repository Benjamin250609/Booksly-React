import React from 'react';

function ListaLibrosProgreso({ titulo, libros }) {
    return (
        <>
            <h2 className="mb-3">{titulo}</h2>
            <div className="d-grid gap-3">
                {libros.length > 0 ? (
                    libros.map(libro => {
                        const progreso = libro.totalPages > 0 ? Math.round((libro.currentPage / libro.totalPages) * 100) : 0;
                        return (
                            <div key={libro.id} className="tarjeta-progreso-libro">
                                <img src={libro.cover} alt={`Portada de ${libro.title}`} />
                                <div className="info-progreso-libro">
                                    <h5>{libro.title}</h5>
                                    <p className="author">{libro.author}</p>
                                    {libro.status === 'leyendo' ? (
                                        <>
                                            <div className="progress" role="progressbar">
                                                <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
                                            </div>
                                            <div className="detalles-progreso">
                                                <span>Pág. {libro.currentPage} de {libro.totalPages}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="mb-0 text-success">
                                            <i className="bi bi-check-circle-fill"></i> Completado
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-muted">
                        {titulo === "Libros en Curso" ? "No tienes libros en curso." : "Aún no has terminado ningún libro."}
                    </p>
                )}
            </div>
        </>
    );
}

export default ListaLibrosProgreso;