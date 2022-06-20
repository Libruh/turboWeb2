import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './turbo.css';

// Pages
import HomePage from './pages/homepage';
import Dev from './pages/dev';
import About from './pages/about';
import Archive from './pages/archive';

function App() {
  return (
    <div className="appWrapper">
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/archive" element={<Archive/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/dev" element={<Dev/>}/>
        <Route exact path="/" element={<Navigate to='/home' />}/>
        <Route exact path="/404" element={<Navigate to='/home' />}/>
        <Route path="*" element={<Navigate to='/404' />}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
