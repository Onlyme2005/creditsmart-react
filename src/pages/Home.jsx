    import React, { useState } from 'react';
    import CreditCard from '../components/CreditCard';
    import creditsData from '../data/creditsData';
    import './Home.css';

    const Home = () => {
    const [credits] = useState(creditsData);

    return (
        <div className="home-container">
        <header className="home-header">
            <h1>Catálogo de Créditos Disponibles</h1>
            <p>Encuentra el crédito ideal para tus necesidades</p>
        </header>
        
        <div className="credits-grid">
            {credits.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
            ))}
        </div>
        </div>
    );
    };

    export default Home;