import { Link } from "react-router-dom";

import { Navbar, Container, Button } from 'react-bootstrap'

function Navbar_Superior() {
    return (
        <Navbar expand='lg' className="barra-navegacion-personalizada">
            <Container>
                <Navbar.Brand as={Link} to="/">Booksy</Navbar.Brand>
                <div className="ms-auto d-flex gap-2">
                    <Button as={Link} to="/login" variant="primary">Registrarse</Button>
                    <Button as={Link} to="/registro" variant="primary" >Iniciar Sesión</Button>
                </div>
            </Container>
        </Navbar>
    )
}

export default Navbar_Superior;