import React from 'react';

function TarjetaEstadistica({ icono, valor, etiqueta }) {
    return (
        <div className="col-md-4">
            <div className="tarjeta-estadistica">
                <div className="icono-estadistica">
                    <i className={`bi ${icono}`}></i>
                </div>
                <div className="valor-estadistica">{valor}</div>
                <div className="etiqueta-estadistica">{etiqueta}</div>
            </div>
        </div>
    );
}

export default TarjetaEstadistica;

