import React, { useMemo } from 'react';

const NOMBRES_MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function CalendarGrid({ currentDate, setCurrentDate, selectedDate, onDateSelect, eventos }) {

    const ano = currentDate.getFullYear();
    const mes = currentDate.getMonth();
    const hoy = new Date();
    
    
    const calendarDays = useMemo(() => {
        const dias = [];
        const primerDiaMes = new Date(ano, mes, 1).getDay();
        const diasEnMes = new Date(ano, mes + 1, 0).getDate();
        const primerDiaAjustado = (primerDiaMes === 0) ? 6 : primerDiaMes - 1; // 0=Lunes

       
        const diasMesAnterior = new Date(ano, mes, 0).getDate();
        for (let i = primerDiaAjustado; i > 0; i--) {
            dias.push({ day: diasMesAnterior - i + 1, isOtherMonth: true });
        }

        for (let i = 1; i <= diasEnMes; i++) {
            const fecha = new Date(ano, mes, i);
            const fechaStr = fecha.toISOString().split('T')[0];
            
            dias.push({
                day: i,
                date: fecha,
                isToday: fecha.toDateString() === hoy.toDateString(),
                isSelected: fecha.toDateString() === selectedDate.toDateString(),
                hasEvent: !!eventos[fechaStr],
                isOtherMonth: false,
            });
        }


        const celdasTotales = dias.length;
        const diasSiguiente = (celdasTotales % 7 === 0) ? 0 : 7 - (celdasTotales % 7);
        for (let i = 1; i <= diasSiguiente; i++) {
            dias.push({ day: i, isOtherMonth: true });
        }
        
        return dias;
    }, [ano, mes, selectedDate, eventos]); 


  
    const mesAnterior = () => setCurrentDate(new Date(ano, mes - 1, 1));
    const mesSiguiente = () => setCurrentDate(new Date(ano, mes + 1, 1));

    return (
        <div className="contenedor-calendario">
            <div className="encabezado-calendario">
                <button className="btn btn-outline-secondary" onClick={mesAnterior}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <h2 id="mes-ano">{`${NOMBRES_MESES[mes]} ${ano}`}</h2>
                <button className="btn btn-outline-secondary" onClick={mesSiguiente}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>

            <div className="cuadricula-calendario dias-semana">
                {DIAS_SEMANA.map(dia => (
                    <div key={dia} className="dia-semana">{dia}</div>
                ))}
            </div>

            <div className="cuadricula-calendario" id="dias-calendario">
                {calendarDays.map((dia, index) => {
                    const classNames = `calendar-day ${dia.isOtherMonth ? 'other-month' : ''} ${dia.isToday ? 'today' : ''} ${dia.isSelected ? 'selected' : ''}`;

                    return (
                        <div 
                            key={index} 
                            className={classNames}
                            onClick={() => !dia.isOtherMonth && onDateSelect(dia.date)}
                        >
                            {dia.day}
                            {dia.hasEvent && <div className="event-dot"></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CalendarGrid;