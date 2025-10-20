import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/MobileNavbar.css'; 

function MobileNavbar() {
    return (
        <nav className="bottom-navbar d-lg-none">
            <NavLink className="bottom-nav-link" to="/app/inicio">
                <i className="bi bi-house-door-fill"></i>
                <span>Inicio</span>
            </NavLink>
            <NavLink className="bottom-nav-link" to="/app/buscar">
                <i className="bi bi-search"></i>
                <span>Buscar</span>
            </NavLink>
            <NavLink className="bottom-nav-link" to="/app/feed">
                <i className="bi bi-plus-circle-fill"></i>
                <span>Feed</span>
            </NavLink>
            <NavLink className="bottom-nav-link" to="/app/calendario">
                <i className="bi bi-calendar-event"></i>
                <span>Calendario</span>
            </NavLink>
            <NavLink className="bottom-nav-link" to="/app/estadisticas">
                <i className="bi bi-graph-up"></i>
                <span>Progreso</span>
            </NavLink>
        </nav>
    );
}

export default MobileNavbar;