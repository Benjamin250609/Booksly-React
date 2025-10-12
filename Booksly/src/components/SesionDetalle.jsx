import React, { useState, useEffect } from 'react';


function SesionLectura({ libro, onGuardarCambios }) {
  const [paginaActualInput, setPaginaActualInput] = useState(libro.currentPage || '');
  const [segundos, setSegundos] = useState(0);
  const [timerActivo, setTimerActivo] = useState(false);


  useEffect(() => {
    let intervalo = null;
    if (timerActivo) {
      intervalo = setInterval(() => setSegundos(s => s + 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [timerActivo]);
  

  useEffect(() => {
    setPaginaActualInput(libro.currentPage || '');
  }, [libro.currentPage]);

  const handleToggleTimer = () => {
    if (timerActivo) {
      const minutosLeidos = Math.floor(segundos / 60);
      if (minutosLeidos > 0) {
        onGuardarCambios({
          ...libro,
          timeReadInMinutes: (libro.timeReadInMinutes || 0) + minutosLeidos,
        });
      }
      setSegundos(0);
    }
    setTimerActivo(!timerActivo);
  };
  

  const handleActualizarProgreso = () => {
    const nuevaPagina = parseInt(paginaActualInput, 10);
    if (!isNaN(nuevaPagina) && nuevaPagina >= 0 && nuevaPagina <= libro.totalPages) {
        const libroActualizado = { ...libro, currentPage: nuevaPagina };
        if (nuevaPagina === libro.totalPages) {
            libroActualizado.status = 'finalizado';
        }
        onGuardarCambios(libroActualizado);
        alert('Progreso guardado.');
    } else {
        alert(`Por favor, introduce un número de página válido (entre 0 y ${libro.totalPages}).`);
    }
  };
  

  const handleFinalizarLibro = () => {
    if(window.confirm(`¿Estás seguro de que quieres marcar "${libro.title}" como terminado?`)){
        const libroActualizado = { 
            ...libro, 
            currentPage: libro.totalPages,
            status: 'finalizado'
        };
        onGuardarCambios(libroActualizado);
        alert('¡Felicidades por terminar el libro!');
    }
  };

  const formatoCronometro = (totalSegundos) => {
    const h = String(Math.floor(totalSegundos / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, '0');
    const s = String(totalSegundos % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="tarjeta-sesion-lectura">
      <h3>Registrar Sesión de Lectura</h3>
      <div className="contenedor-cronometro">
        <div className="temporizador">{formatoCronometro(segundos)}</div>
        <button onClick={handleToggleTimer} className="btn-temporizador">
          <i className={`bi ${timerActivo ? 'bi-stop-fill' : 'bi-play-fill'}`}></i> {timerActivo ? 'Detener' : 'Iniciar'}
        </button>
      </div>
      <div className="contenedor-actualizar-progreso">
        <label htmlFor="entrada-pagina-actual">¿En qué página vas?</label>
        <div className="input-group">
          <input
            type="number"
            id="entrada-pagina-actual"
            placeholder={`p. ej. ${libro.currentPage}`}
            value={paginaActualInput}
            onChange={(e) => setPaginaActualInput(e.target.value)}
          />
          <button onClick={handleActualizarProgreso} className="btn-actualizar">Guardar</button>
        </div>
      </div>
      <button onClick={handleFinalizarLibro} className="btn-finalizar">
        <i className="bi bi-check2-circle"></i> Marcar como Terminado
      </button>
    </div>
  );
}

export default SesionLectura;
