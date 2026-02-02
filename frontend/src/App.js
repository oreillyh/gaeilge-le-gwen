import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Navigation/Sidebar';
import Topics from './components/Topics/Topics';
import Lessons from './components/Lessons/Lessons';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/topici" element={<Topics />} />
            <Route path="/aiseanna" element={<Lessons />} />
            <Route path="/teagmhail" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
