import React from 'react';

function LibroEncabezado({ libro }) {
  if (!libro) return null;

  const progreso = Math.round((libro.currentPage / libro.totalPages) * 100) || 0;

  return (
    <div className="encabezado-libro">
      <img src={libro.cover} alt={`Portada de ${libro.title}`} className="portada-libro" />
      <div className="info-libro">
        <h1>{libro.title}</h1>
        <p className="autor">{libro.author}</p>
        <div className="seccion-progreso">
          <div className="etiqueta-progreso">
            <span>Progreso</span>
            <span>{progreso}%</span>
          </div>
          <div className="contenedor-barra-progreso">
            <div className="relleno-barra-progreso" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibroEncabezado;
