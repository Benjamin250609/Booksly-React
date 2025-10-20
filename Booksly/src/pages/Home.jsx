
import { Link } from "react-router-dom";
import react from '../assets/react.svg';
import Navbar_Superior from "../components/Navbar";

import { Container, Row, Col, Button } from 'react-bootstrap';

import '../styles/Registro-login.css'

function Home() {
    return (
        <>
            <Navbar_Superior />
            <main>
                <section className="seccion-presentacion text-center">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="text-md-start">
                                <h1 className="display-1">Tu universo literario, en un solo lugar.</h1>
                                <p className="lead my-4">Organiza tus lecturas, registra tu progreso y conecta con una comunidad de amantes de los libros.</p>
                            </Col>
                            <Col md={6}>
                                <img src={react} className="img-fluid rounded-3" alt="Ilustración de un libro" />
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="seccion-caracteristicas">
                    <Container>
                        <div className="text-center mb-5">
                            <h2>Todo lo que necesitas para potenciar tu lectura</h2>
                        </div>
                        <Row className="g-4">
                            <Col md={4}>
                                <div className="tarjeta-caracteristica">
                                    <i className="bi bi-bookshelf icono-caracteristica"></i>
                                    <h3>Organiza tu Biblioteca</h3>
                                    <p>Clasifica tus libros como "Leyendo", "Finalizados" o "Pendientes".</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="tarjeta-caracteristica">
                                    <i className="bi bi-graph-up icono-caracteristica"></i>
                                    <h3>Registra tu Progreso</h3>
                                    <p>Usa el cronómetro y las estadísticas para motivarte.</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="tarjeta-caracteristica">
                                    <i className="bi bi-people-fill icono-caracteristica"></i>
                                    <h3>Conecta con la Comunidad</h3>
                                    <p>Comparte reseñas y descubre qué leen tus amigos.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="seccion-llamada-accion text-center">
                    <Container>
                        <h2>¿Listo para empezar tu nueva aventura literaria?</h2>
                        <Button as={Link} to="/registro" className="boton-formulario" style={{ width: 'auto' }}>Únete a la comunidad</Button>
                    </Container>
                </section>
            </main>
        </>
    );
}

export default Home;