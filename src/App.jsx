  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import Home from './pages/Home';
  import ScrollToTop from './components/ScrollToTop';
  import Simulator from './pages/Simulator';
  import RequestCredit from './pages/RequestCredit';
  import './App.css';

  function App() {
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/request" element={<RequestCredit />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2024 CreditSmart - FinTech Solutions S.A.S</p>
            <p>Desarrollado para Ingeniería Web I</p>
          </footer>
        </div>
      </Router>
    );
  }

  export default App;