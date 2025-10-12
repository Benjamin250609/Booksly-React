

import "../styles/Principal.css"

function Principal() {
    return (
        <>
            
            <div className="fila-superior">
                <div className="tarjeta-bienvenida">
                    <h1 id="mensaje-bienvenida">¡Bienvenido de vuelta!</h1>
                    <p className="cita">"Un lector vive mil vidas antes de morir. Aquel que nunca lee vive solo una."</p>
                </div>
            </div>
            <div className="seccion-mis-libros">
                <h2 className="titulo-seccion">Mi Estantería</h2>
                <button type="button" id="boton-agregar-libro" className="boton-agregar-libro">
                    <i className="bi bi-plus-circle"></i> Agregar un Libro
                </button>
            </div>
            <div id="carrusel-libros" className="carrusel-libros">
            </div>
        </>
    );
}

export default Principal;