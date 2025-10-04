function AppSidebar() {

    return (
        <div className="contenedor-principal">
            <nav id="barra-lateral" className="barra-lateral d-none d-lg-flex">
                <div className="barra-lateral-encabezado">
                    <h3><i className="bi bi-book-half"></i> Booksy</h3>
                </div>
                <ul className="barra-lateral-menu">
                    <li><a href="#" className="active"><i className="bi bi-house-door-fill"></i> Inicio</a></li>
                    <li><a href="#"><i className="bi bi-search"></i> Buscar</a></li>
                    <li><a href="#"><i className="bi bi-plus-circle-fill"></i> Feed</a></li>
                    <li><a href="#"><i className="bi bi-calendar-event"></i> Calendario</a></li>
                    <li><a href="#"><i className="bi bi-graph-up"></i> Mi Progreso</a></li>
                    <hr className="barra-lateral-divisor" />
                    <li><a href="#"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</a></li>
                </ul>
            </nav>
        </div>
    );
}


export default AppSidebar;