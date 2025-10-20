import React, { useState, useEffect } from 'react'; 
import CalendarGrid from '../components/CalendarioGrid';
import EventList from '../components/EventList';


import { getEventosCalendario } from '../services/ApiService'; 

import '../styles/Calendario.css' 

function Calendario() {
   
    const [eventos, setEventos] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        async function fetchEventos() {
            try {
             
                const data = await getEventosCalendario(); 
                setEventos(data.eventos);
            } catch (err) {
                setError('No se pudieron cargar los eventos.');
                console.error(err);
            } finally {
                setLoading(false); 
            }
        }

        fetchEventos();
    }, []); 

    

    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const eventsForDay = eventos[selectedDateString] || [];

    if (loading) {
        return <div className="container-fluid"><p>Cargando calendario...</p></div>;
    }

    if (error) {
        return <div className="container-fluid"><p className="text-danger">{error}</p></div>;
    }

 
    return (
        <div className="container-fluid">
            <h1 className="mb-4">Calendario de Eventos</h1>
            <div className="row">
                <div className="col-lg-8">
                    <CalendarGrid 
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate} 
                        eventos={eventos} 
                    />
                </div>
                <div className="col-lg-4 mt-4 mt-lg-0">
                    <EventList events={eventsForDay} />
                </div>
            </div>
        </div>
    );
}

export default Calendario;