import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminProvider } from './contexts/AdminContext';
import Sidebar from './components/Navigation/Sidebar';
import Topics from './components/Topics/Topics';
import TopicViewer from './components/Topics/TopicViewer';
import Lessons from './components/Lessons/Lessons';
import Contact from './components/Contact/Contact';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AIChat from './components/Admin/AIChat';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Admin Routes (No Sidebar) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/ai-chat" element={<AIChat />} />
            
            {/* Public Routes (With Sidebar) */}
            <Route path="*" element={
              <>
                <Sidebar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Topics />} />
                    <Route path="/topici" element={<Topics />} />
                    <Route path="/topici/:topicId" element={<TopicViewer />} />
                    <Route path="/aiseanna" element={<Lessons />} />
                    <Route path="/teagmhail" element={<Contact />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
