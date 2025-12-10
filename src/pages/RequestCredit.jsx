    import React, { useState, useEffect } from 'react';
    import creditsData from '../data/creditsData';
    import './RequestCredit.css';

    const RequestCredit = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        id: '',
        email: '',
        phone: '',
        creditType: '',
        amount: '',
        term: '',
        purpose: '',
        company: '',
        position: '',
        monthlyIncome: ''
    });
    
    const [errors, setErrors] = useState({});
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [applications, setApplications] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    
    // Calcular cuota mensual
    useEffect(() => {
        if (formData.amount && formData.term && formData.creditType) {
        const selectedCredit = creditsData.find(c => c.name === formData.creditType);
        if (selectedCredit) {
            const rate = selectedCredit.interestRate / 100 / 12;
            const principal = Number(formData.amount);
            const months = Number(formData.term);
            
            if (rate === 0) {
            setMonthlyPayment(principal / months);
            } else {
            const payment = (principal * rate * Math.pow(1 + rate, months)) / 
                            (Math.pow(1 + rate, months) - 1);
            setMonthlyPayment(payment);
            }
        }
        } else {
        setMonthlyPayment(0);
        }
    }, [formData.amount, formData.term, formData.creditType]);
    
    // Validaciones
    const validateField = (name, value) => {
        switch (name) {
        case 'email':
            return /\S+@\S+\.\S+/.test(value) ? '' : 'Email inválido';
        case 'phone':
            return /^\d{10}$/.test(value) ? '' : 'Teléfono inválido (10 dígitos)';
        case 'id':
            return /^\d{6,12}$/.test(value) ? '' : 'Cédula inválida';
        case 'amount':
            const numAmount = Number(value);
            const credit = creditsData.find(c => c.name === formData.creditType);
            if (credit && (numAmount < credit.minAmount || numAmount > credit.maxAmount)) {
            return `Monto debe estar entre $${credit.minAmount.toLocaleString()} y $${credit.maxAmount.toLocaleString()}`;
            }
            return numAmount > 0 ? '' : 'Monto inválido';
        default:
            return value.trim() ? '' : 'Este campo es requerido';
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Validación en tiempo real
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar todos los campos
        const newErrors = {};
        Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
        });
        
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }
        
        setShowSummary(true);
    };
    
    const confirmRequest = () => {
        // Agregar a array en memoria
        const newApplication = {
        ...formData,
        monthlyPayment,
        date: new Date().toISOString(),
        status: 'Pendiente'
        };
        
        setApplications(prev => [...prev, newApplication]);
        setSubmitted(true);
        setShowSummary(false);
        
        // Limpiar formulario
        setFormData({
        fullName: '',
        id: '',
        email: '',
        phone: '',
        creditType: '',
        amount: '',
        term: '',
        purpose: '',
        company: '',
        position: '',
        monthlyIncome: ''
        });
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => setSubmitted(false), 5000);
    };
    
    const terms = [12, 24, 36, 48, 60];
    
    return (
        <div className="request-container">
        <header className="request-header">
            <h1>Solicitar Crédito</h1>
            <p>Completa el formulario para solicitar tu crédito</p>
        </header>
        
        {submitted && (
            <div className="success-message">
            ¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo pronto.
            </div>
        )}
        
        {showSummary ? (
            <div className="summary-section">
            <h2>Resumen de Solicitud</h2>
            <div className="summary-details">
                <p><strong>Nombre:</strong> {formData.fullName}</p>
                <p><strong>Cédula:</strong> {formData.id}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Crédito:</strong> {formData.creditType}</p>
                <p><strong>Monto:</strong> ${Number(formData.amount).toLocaleString()}</p>
                <p><strong>Plazo:</strong> {formData.term} meses</p>
                <p><strong>Cuota mensual estimada:</strong> ${monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="summary-actions">
                <button onClick={confirmRequest} className="confirm-btn">
                Confirmar Solicitud
                </button>
                <button onClick={() => setShowSummary(false)} className="cancel-btn">
                Volver a editar
                </button>
            </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="request-form">
            {/* Sección 1: Datos Personales */}
            <fieldset className="form-section">
                <legend>Datos Personales</legend>
                
                <div className="form-group">
                <label htmlFor="fullName">Nombre completo *</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>
                
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="id">Cédula *</label>
                    <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    />
                    {errors.id && <span className="error">{errors.id}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">Teléfono *</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                </div>
            </fieldset>
            
            {/* Sección 2: Datos del Crédito */}
            <fieldset className="form-section">
                <legend>Datos del Crédito</legend>
                
                <div className="form-group">
                <label htmlFor="creditType">Tipo de crédito *</label>
                <select
                    id="creditType"
                    name="creditType"
                    value={formData.creditType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un crédito</option>
                    {creditsData.map(credit => (
                    <option key={credit.id} value={credit.name}>
                        {credit.name} - {credit.interestRate}% interés
                    </option>
                    ))}
                </select>
                {errors.creditType && <span className="error">{errors.creditType}</span>}
                </div>
                
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="amount">Monto solicitado *</label>
                    <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0"
                    required
                    />
                    {errors.amount && <span className="error">{errors.amount}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="term">Plazo en meses *</label>
                    <select
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Seleccione plazo</option>
                    {terms.map(term => (
                        <option key={term} value={term}>{term} meses</option>
                    ))}
                    </select>
                    {errors.term && <span className="error">{errors.term}</span>}
                </div>
                </div>
                
                <div className="form-group">
                <label htmlFor="purpose">Destino del crédito</label>
                <textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    rows="3"
                />
                </div>
            </fieldset>
            
            {/* Sección 3: Datos Laborales */}
            <fieldset className="form-section">
                <legend>Datos Laborales</legend>
                
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="company">Empresa *</label>
                    <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    />
                    {errors.company && <span className="error">{errors.company}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="position">Cargo *</label>
                    <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    />
                    {errors.position && <span className="error">{errors.position}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="monthlyIncome">Ingresos mensuales *</label>
                    <input
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    min="0"
                    required
                    />
                    {errors.monthlyIncome && <span className="error">{errors.monthlyIncome}</span>}
                </div>
                </div>
            </fieldset>
            
            {/* Cálculo de cuota */}
            {monthlyPayment > 0 && (
                <div className="payment-calculator">
                <h3>Estimación de cuota mensual:</h3>
                <div className="payment-result">
                    <span className="payment-amount">${monthlyPayment.toFixed(2)}</span>
                    <span className="payment-period">/ mes</span>
                </div>
                <p className="payment-note">* Cálculo estimado basado en tasa de interés del producto seleccionado</p>
                </div>
            )}
            
            {/* Botones */}
            <div className="form-actions">
                <button type="submit" className="submit-btn">
                Enviar Solicitud
                </button>
                <button
                type="button"
                onClick={() => setFormData({
                    fullName: '',
                    id: '',
                    email: '',
                    phone: '',
                    creditType: '',
                    amount: '',
                    term: '',
                    purpose: '',
                    company: '',
                    position: '',
                    monthlyIncome: ''
                })}
                className="clear-btn"
                >
                Limpiar Formulario
                </button>
            </div>
            </form>
        )}
        </div>
    );
    };

    export default RequestCredit;