import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
<nav>
  <div className="brand">
    <Link to="/">CoursePlatform</Link>
  </div>
  <div>
    <Link to="/">Home</Link>
    {!user && <Link to="/login">Login</Link>}
    {!user && <Link to="/register">Register</Link>}
    {user && <Link to="/dashboard">Dashboard</Link>}
    {user && <span className="logout" onClick={handleLogout}>Logout</span>}
  </div>
</nav>
  );
}
