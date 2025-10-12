
import { Outlet, Link } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="contenedor-principal">
      <nav id="barra-lateral" className="barra-lateral d-none d-lg-flex">
        <div className="barra-lateral-encabezado">
          <h3><i className="bi bi-book-half"></i> Booksy</h3>
        </div>
        <ul className="barra-lateral-menu">
          <li>
            <Link to="/app/inicio">
              <i className="bi bi-house-door-fill"></i> Inicio
            </Link>
          </li>
          <li>
            <Link to="/app/buscar">
              <i className="bi bi-search"></i> Buscar
            </Link>
          </li>
          <li>
            <Link to="/app/feed">
              <i className="bi bi-plus-circle-fill"></i> Feed
            </Link>
          </li>
          <li>
            <Link to="/app/calendario">
              <i className="bi bi-calendar-event"></i> Calendario
            </Link>
          </li>
          <li>
            <Link to="/app/estadisticas">
              <i className="bi bi-graph-up"></i> Mi Progreso
            </Link>
          </li>
          <hr className="barra-lateral-divisor" />
          <li>
            <Link to="/">
              <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </nav>
      
      <main className="contenido-principal">
        <Outlet />
      </main>
      
    </div>
  );
}

export default AppLayout;
