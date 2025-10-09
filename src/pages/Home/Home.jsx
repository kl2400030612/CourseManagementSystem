import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Welcome to Course Platform</h1>
      <p>Your place to learn awesome courses online!</p>

      <button
        onClick={() => navigate('/login')}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: 20,
          borderRadius: 4,
          border: 'none',
          backgroundColor: '#282c34',
          color: 'white',
        }}
      >
        Login
      </button>

      <hr style={{ margin: '40px 0' }} />

      <h2>Featured Courses</h2>
      <ul>
        <li>React for Beginners</li>
        <li>Intro to Python Programming</li>
        <li>Web Development Bootcamp</li>
      </ul>
    </div>
  );
}
