import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  // import CSS file

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-link brand-link">
          CoursePlatform
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>

        {!user && (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
            <span onClick={handleLogout} className="navbar-link logout-link" role="button" tabIndex={0}>
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
}
