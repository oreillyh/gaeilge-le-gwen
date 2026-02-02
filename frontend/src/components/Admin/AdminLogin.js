import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import './AdminLogin.css';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p className="login-subtitle">Gaeilge le Gwen Content Management</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <button onClick={() => navigate('/')} className="back-link">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
