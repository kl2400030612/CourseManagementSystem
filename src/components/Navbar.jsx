import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>CoursePlatform</Link>
      </div>
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
        {!user && <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>}
        {!user && <Link to="/register" style={{ color: "#fff", marginRight: "10px" }}>Register</Link>}
        {user && <Link to="/dashboard" style={{ color: "#fff", marginRight: "10px" }}>Dashboard</Link>}
        {user && <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>}
      </div>
    </nav>
  );
}
