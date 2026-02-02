import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import ApiService from '../../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'ai-chat'
  const { logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await ApiService.adminGetTopics();
      setTopics(data.topics || []);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (topicId) => {
    navigate(`/admin/edit/${topicId}`);
  };

  const handleDelete = async (topicId) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        await ApiService.deleteTopic(topicId);
        loadTopics();
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="admin-dashboard"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Content Management</h1>
          <p className="admin-subtitle">Gaeilge le Gwen Admin Panel</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <nav className="admin-nav">
        <button 
          className={view === 'list' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setView('list')}
        >
          📚 All Topics ({topics.length})
        </button>
        <button 
          className={view === 'ai-chat' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setView('ai-chat')}
        >
          🤖 AI Assistant
        </button>
        <button 
          className="nav-btn create"
          onClick={() => navigate('/admin/create')}
        >
          ➕ Create New Topic
        </button>
      </nav>

      {view === 'list' && (
        <div className="topics-manager">
          <div className="topics-list">
            {topics.map(topic => (
              <div key={topic.topic_id} className="topic-item">
                <div className="topic-info">
                  <span className="topic-id">#{topic.topic_id}</span>
                  <div>
                    <h3>{topic.topic_name}</h3>
                    <p>{topic.topic_desc}</p>
                  </div>
                </div>
                <div className="topic-stats">
                  <span>{topic.core_phrases?.length || 0} phrases</span>
                  <span>{topic.vocabulary?.length || 0} words</span>
                </div>
                <div className="topic-actions">
                  <button onClick={() => handleEdit(topic.topic_id)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => navigate(`/topici/${topic.topic_id}`)} className="view-btn">
                    👁️ View
                  </button>
                  <button onClick={() => handleDelete(topic.topic_id)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'ai-chat' && (
        <div className="ai-chat-container">
          <p className="chat-intro">Use AI to quickly generate or modify topic content</p>
          <button 
            onClick={() => navigate('/admin/ai-chat')}
            className="open-chat-btn"
          >
            Open AI Chat Assistant →
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
