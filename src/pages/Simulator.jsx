    import React, { useState } from 'react';
    import CreditCard from '../components/CreditCard';
    import creditsData from '../data/creditsData';
    import './Simulator.css';

    const Simulator = () => {
    const [credits] = useState(creditsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [amountRange, setAmountRange] = useState(0);
    const [sortByInterest, setSortByInterest] = useState(false);
    
    // Filtrar créditos
    const filteredCredits = credits.filter(credit => {
        const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAmount = amountRange === 0 || 
        (credit.minAmount <= amountRange && credit.maxAmount >= amountRange);
        return matchesSearch && matchesAmount;
    });
    
    // Ordenar si es necesario
    let sortedCredits = [...filteredCredits];
    if (sortByInterest) {
        sortedCredits.sort((a, b) => a.interestRate - b.interestRate);
    }
    
    return (
        <div className="simulator-container">
            <header className='simulator-header'>
        <h1>Simulador de Créditos</h1>
        <p>Encuentra el crédito que mejor se adapte a tus necesidades</p>
        </header>
        {/* Filtros y Búsqueda */}
        <div className="filters-section">
            <div className="search-box">
            <input
                type="text"
                placeholder="Buscar por nombre de crédito..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            </div>
            
            <div className="filters-row">
            <div className="filter-group">
                <label htmlFor="amountRange">Filtrar por monto máximo:</label>
                <div className="slider-container">
                <input
                    type="range"
                    id="amountRange"
                    min="1000000"
                    max="500000000"
                    step="1000000"
                    value={amountRange}
                    onChange={(e) => setAmountRange(Number(e.target.value))}
                    className="amount-slider"
                />
                <span className="slider-value">${amountRange.toLocaleString()}</span>
                </div>
            </div>
            
            <div className="filter-group">
                <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={sortByInterest}
                    onChange={() => setSortByInterest(!sortByInterest)}
                />
                Ordenar por tasa de interés (menor a mayor)
                </label>
            </div>
            </div>
        </div>
        
        {/* Resultados */}
        <div className="results-section">
            {sortedCredits.length > 0 ? (
            <div className="credits-grid">
                {sortedCredits.map(credit => (
                <CreditCard key={credit.id} credit={credit} />
                ))}
            </div>
            ) : (
            <div className="no-results">
                <h3>No hay créditos disponibles con los filtros aplicados</h3>
                <p>Intenta con otros criterios de búsqueda</p>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default Simulator;