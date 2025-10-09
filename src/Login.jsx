import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from './auth.js';

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
    <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: 8 }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
