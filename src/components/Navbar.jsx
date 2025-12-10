    import React from 'react';
    import { Link } from 'react-router-dom';
    import './Navbar.css';

    const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" className="brand-link">
            <span className="brand-icon">💳</span>
            <span className="brand-text">CreditSmart</span>
            </Link>
        </div>
        
        <ul className="navbar-menu">
            <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
            <Link to="/simulator" className="nav-link">Simulador</Link>
            </li>
            <li className="nav-item">
            <Link to="/request" className="nav-link">Solicitar Crédito</Link>
            </li>
        </ul>
        
        <div className="navbar-user">
            <span className="user-greeting">¡Bienvenido!</span>
        </div>
        </nav>
    );
    };

    export default Navbar;