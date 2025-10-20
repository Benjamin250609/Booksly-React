import React from 'react';

function EventList({ events }) {
    return (
        <div id="lista-eventos" className="contenedor-calendario">
            <h3 className="mb-3">Eventos del Día</h3>
            <div id="detalles-evento">
                {events.length > 0 ? (
                    events.map((evento, index) => (
                        <div key={index} className="event-item mb-2">
                            <strong>{evento.type}:</strong> {evento.title}
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No hay eventos para este día.</p>
                )}
            </div>
        </div>
    );
}

export default EventList;