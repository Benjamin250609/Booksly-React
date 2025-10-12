import React, { useState, useEffect } from 'react';

import { searchGoogleBooks } from '../services/ApiService.jsx';

import LibroCard from '../components/LibroBuscar.jsx';

import '../styles/Buscar.css';

function Buscar() {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [novedades, setNovedades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    useEffect(() => {
        const cargarNovedades = async () => {
            try {
                const data = await searchGoogleBooks('últimos lanzamientos Chile', 8);
                if (data.items) {
                    setNovedades(data.items);
                }
            } catch (err) {
                console.error("Error al cargar novedades:", err);
            }
        };
        cargarNovedades();
    }, []); 

    const handleBusqueda = async () => {
        if (!terminoBusqueda.trim()) {
            setError('Por favor, escribe algo para buscar.');
            return;
        }
        setCargando(true);
        setError('');
        setBusquedaRealizada(true);
        try {
            const data = await searchGoogleBooks(terminoBusqueda, 12);
            setResultados(data.items || []);
        } catch (err) {
            setError('Ocurrió un error al realizar la búsqueda.');
            console.error("Error en la búsqueda:", err);
        } finally {
            setCargando(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBusqueda();
        }
    };

    return (
        <div>
            <h1 className="mb-4">Buscar y Descubrir</h1>
            <div className="row mb-5">
                <div className="col-md-8 mx-auto">
                    <div className="input-group">
                        <input 
                            id="entrada-busqueda" 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Busca por título, autor o género..."
                            value={terminoBusqueda}
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                        <button 
                            id="boton-busqueda" 
                            className="btn btn-primary" 
                            type="button"
                            onClick={handleBusqueda}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </div>
            </div>

            {busquedaRealizada && (
                <>
                    <h2 className="mb-3">Resultados de la Búsqueda</h2>
                    <div id="resultados-busqueda" className="row g-4 mb-5">
                        {cargando ? (
                            <p>Buscando...</p>
                        ) : resultados.length > 0 ? (
                            resultados.map(item => <LibroCard key={item.id} libroInfo={item.volumeInfo} />)
                        ) : (
                            <p className="text-muted">No se encontraron libros para "{terminoBusqueda}".</p>
                        )}
                    </div>
                </>
            )}
            <h2 className="mb-3">Novedades Populares</h2>
            <div id="resultados-novedades" className="row g-4">
                {novedades.length > 0 ? (
                    novedades.map(item => <LibroCard key={item.id} libroInfo={item.volumeInfo} />)
                ) : (
                    <p>Cargando novedades...</p>
                )}
            </div>
        </div>
    );
}

export default Buscar;