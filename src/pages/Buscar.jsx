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
    const [buscandoNovedades, setBuscandoNovedades] = useState(true);

    useEffect(() => {
        const cargarNovedades = async () => {
            try {
                const data = await searchGoogleBooks('best sellers books 2024', 4);
                if (data && data.items) {
                    setNovedades(data.items);
                }
            } catch (err) {
                console.error("Error al cargar novedades:", err);
            } finally {
                setBuscandoNovedades(false);
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
            setError('Ocurrió un error al conectar con el catálogo.');
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') handleBusqueda();
    };

    return (
        <div className="buscar-container">
            <h1 className="mb-4">Explorar Catálogo</h1>
            
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <div className="input-group">
                        <input 
                            id="entrada-busqueda" 
                            type="text" 
                            placeholder="Busca por título, autor o género..."
                            value={terminoBusqueda}
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                        <button 
                            id="boton-busqueda" 
                            type="button"
                            onClick={handleBusqueda}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    {error && <p className="text-danger mt-2 text-center">{error}</p>}
                </div>
            </div>

            {busquedaRealizada && (
                <>
                    <h2 className="mb-3">Resultados</h2>
                    <div id="resultados-busqueda">
                        {cargando ? (
                            <p className="text-center w-100">Buscando en el catálogo...</p>
                        ) : resultados.length > 0 ? (
                            resultados.map(item => <LibroCard key={item.id} libroInfo={item.volumeInfo} />)
                        ) : (
                            <p className="text-center text-muted w-100">No se encontraron resultados.</p>
                        )}
                    </div>
                </>
            )}

            {resultados.length === 0 && (
                <>
                    <h2 className="mb-3">Recomendados para ti</h2>
                    <div id="resultados-novedades">
                        {buscandoNovedades ? (
                            <p className="text-center">Cargando recomendaciones...</p>
                        ) : novedades.length > 0 ? (
                            novedades.map(item => <LibroCard key={item.id} libroInfo={item.volumeInfo} />)
                        ) : (
                            <p className="text-muted">No hay recomendaciones disponibles.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Buscar;