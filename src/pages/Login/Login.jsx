import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";
import "./Login.css";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = Storage.get("users", []);
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      setToast({ message: "Invalid username or password", type: "error" });
      return;
    }

    if (!user.approved) {
      setToast({ message: "Your account is pending admin approval", type: "error" });
      return;
    }

    setUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
      />
      <input
        className="login-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      {toast && <Toast {...toast} />}
    </div>
  );
}
