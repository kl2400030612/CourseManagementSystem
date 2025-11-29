import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      setToast({ message: "All fields are required", type: "error" });
      return;
    }

    const users = Storage.get("users", []);
    if (users.find(u => u.username === username)) {
      setToast({ message: "Username already exists", type: "error" });
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      role,
      approved: false, // pending admin approval
    };

    users.push(newUser);
    Storage.set("users", users);
    setToast({ message: "Registered successfully. Wait for admin approval.", type: "success" });

    // Clear form
    setUsername("");
    setPassword("");
    setRole("student");

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <input
        className="register-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <select
        className="register-select"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
      </select>
      <button className="register-button" onClick={handleRegister}>Register</button>
      {toast && <Toast {...toast} />}
    </div>
  );
}
