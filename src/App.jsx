import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSetUser = (user) => {
    setUser(user);
    if (user) localStorage.setItem("loggedInUser", JSON.stringify(user));
    else localStorage.removeItem("loggedInUser");
  };

  return (
    <Router>
      <div className="app-container full-width-section">
        <Navbar user={user} setUser={handleSetUser} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={handleSetUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<h2 className="text-center" style={{ marginTop: "50px" }}>404: Page Not Found</h2>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
