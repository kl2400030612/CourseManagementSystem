import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '15px',
    fontWeight: '500',
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          CoursePlatform
        </Link>
      </div>

      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        {/* Add more links here as needed */}
      </div>
    </nav>
  );
}
