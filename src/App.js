import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './turbo.css';

// Pages
import Home from './pages/home';
import Dev from './pages/dev';
import Projects from './pages/projects';
import Archive from './pages/archive';
import PlaylistViewer from './pages/PlaylistViewer'
import SecretSanta from './pages/SecretSanta';

function App() {
  return (
    <div className="appWrapper">
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/archive" element={<Archive/>}/>
        <Route exact path="/archive/:playlistDate" element={<PlaylistViewer/>}/>
        <Route exact path="/projects" element={<Projects/>}/>
        <Route exact path="/dev" element={<Dev/>}/>
        <Route exact path="/santa" element={<SecretSanta/>}/>
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
