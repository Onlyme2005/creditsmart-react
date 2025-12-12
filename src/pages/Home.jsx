    import React, { useState } from 'react';
    import CreditCard from '../components/CreditCard';
    import creditsData from '../data/creditsData';
    import './Home.css';

    const Home = () => {
    const [credits] = useState(creditsData);

    return (
        <div className="home-container">
            
        <section class ="banner">
            <h2>Encuentra el crédito ideal para ti</h2>
            <p>Compara y solicita entre más de 5 tipos de crédito con las mejores tasas del mercado</p>
        </section>
        
        
        <div className="credits-grid">
            {credits.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
            ))}
        </div>
        </div>
    );
    };

    export default Home;