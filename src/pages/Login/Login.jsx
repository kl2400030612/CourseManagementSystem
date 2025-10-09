import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../auth/auth.js';

import './Login.css'; // Import the CSS

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = authenticate(username, password);
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleLogin()}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
