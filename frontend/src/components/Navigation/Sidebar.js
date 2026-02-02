import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Gaeilge le Gwen</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/topici" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📚</span>
          <span className="nav-text">Topicí</span>
        </NavLink>
        
        <NavLink 
          to="/aiseanna" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📖</span>
          <span className="nav-text">Aiseanna</span>
        </NavLink>
        
        <NavLink 
          to="/teagmhail" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">✉️</span>
          <span className="nav-text">Teagmháil</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={() => navigate('/admin/login')} className="admin-link">
          🔐 Admin
        </button>
        <p className="tagline">Go n-éirí an t-ádh leat!</p>
      </div>
    </aside>
  );
}

export default Sidebar;
