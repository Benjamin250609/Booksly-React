import React from 'react';
import { Link } from "react-router-dom";
import Navbar_Superior from "../components/Navbar";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Home.css'; 


const heroImage = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

function Home() {
    return (
        <>
            <Navbar_Superior />
            <main>
                <section className="hero-section">
                    <div className="hero-circle"></div>
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={6} className="mb-5 mb-lg-0">
                                <div className="hero-content">
                                    <span className="hero-badge">✨ Tu biblioteca digital reinventada</span>
                                    <h1 className="display-title">Lee más. Olvida menos. Comparte todo.</h1>
                                    <p className="lead-text">
                                        Booksy es la herramienta definitiva para lectores modernos. 
                                        Lleva el control de tus lecturas, establece metas y descubre tu próximo libro favorito junto a tus amigos.
                                    </p>
                                    <div className="d-flex gap-3">
                                        <Link to="/registro" className="btn btn-primary btn-lg">
                                            Empezar Gratis
                                        </Link>
                                        <Link to="/login" className="btn btn-outline-danger btn-lg">
                                            Ya tengo cuenta
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="hero-image-container">
                                    <img src={heroImage} alt="Lectura relajada" className="img-fluid hero-img" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* --- BENEFICIOS --- */}
                <section className="section-benefits">
                    <Container>
                        <div className="section-header">
                            <h2>Todo lo que necesitas para potenciar tu lectura</h2>
                            <p className="text-muted">Diseñado por lectores, para lectores. Simplificamos tu vida literaria.</p>
                        </div>
                        <Row className="g-4">
                            <Col md={4}>
                                <div className="benefit-card">
                                    <div className="icon-box">
                                        <i className="bi bi-collection-fill"></i>
                                    </div>
                                    <h3>Organización Total</h3>
                                    <p className="text-muted">
                                        Adiós a las listas en papel. Clasifica tus libros en "Leyendo", "Por leer" y "Terminados" con un solo clic.
                                    </p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="benefit-card">
                                    <div className="icon-box">
                                        <i className="bi bi-graph-up-arrow"></i>
                                    </div>
                                    <h3>Estadísticas Reales</h3>
                                    <p className="text-muted">
                                        Visualiza tu progreso. Mide cuántas páginas lees al día y descubre tus hábitos de lectura con gráficas hermosas.
                                    </p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="benefit-card">
                                    <div className="icon-box">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <h3>Comunidad Activa</h3>
                                    <p className="text-muted">
                                        La lectura no tiene por qué ser solitaria. Comparte reseñas, mira qué leen tus amigos y descubre joyas ocultas.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

             
                <section className="section-why">
                    <Container>
                        <Row className="text-center">
                            <Col md={4} className="mb-4 mb-md-0">
                                <div className="stat-number">+10k</div>
                                <div className="stat-label">Libros Registrados</div>
                            </Col>
                            <Col md={4} className="mb-4 mb-md-0">
                                <div className="stat-number">2x</div>
                                <div className="stat-label">Lectura Promedio</div>
                                <p className="small text-muted mt-2">Nuestros usuarios duplican sus lecturas anuales.</p>
                            </Col>
                            <Col md={4}>
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Gratis para Siempre</div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            
                <section className="section-cta">
                    <Container>
                        <div className="cta-box">
                            <h2>¿Listo para empezar tu nueva aventura?</h2>
                            <p className="lead mb-4 text-white-50">Únete hoy y transforma tu manera de leer. No te pierdas de nada.</p>
                            <Link to="/registro" className="btn-light-cta">
                                Crear mi cuenta ahora
                            </Link>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    );
}

export default Home;