import React from 'react';


const formatoTiempo = (totalMinutos) => {
  if (!totalMinutos) return '0h 0m';
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;
  return `${horas}h ${minutos}m`;
};

function LibroEstadisticas({ libro }) {
  if (!libro) return null;

  return (
    <div className="estadisticas">
      <div className="elemento-estadistica">
        <span className="etiqueta"><i className="bi bi-book"></i> Páginas leídas</span>
        <span className="valor">{libro.currentPage} / {libro.totalPages}</span>
      </div>
      <div className="elemento-estadistica">
        <span className="etiqueta"><i className="bi bi-clock"></i> Tiempo de lectura</span>
        <span className="valor">{formatoTiempo(libro.timeReadInMinutes)}</span>
      </div>
      <div className="elemento-estadistica">
        <span className="etiqueta"><i className="bi bi-calendar-check"></i> Días restantes</span>
        <span className="valor">~{libro.diasRestantes || 'N/A'} días</span>
      </div>
    </div>
  );
}

export default LibroEstadisticas;