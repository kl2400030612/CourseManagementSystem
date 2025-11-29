import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";

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
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", width: "100%", padding: "8px" }}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
      />
      <button onClick={handleLogin} style={{ marginTop: "10px", padding: "10px 20px" }}>Login</button>
      {toast && <Toast {...toast} />}
    </div>
  );
}
