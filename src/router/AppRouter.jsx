import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Toast from "../../components/common/Toast";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const [toast, setToast] = useState(null);

  const handleSubmit = () => {
    if (!form.username || !form.password) {
      setToast({ message: "All fields are required", type: "error" });
      return;
    }

    const result = register(form);
    setToast({ message: result.message, type: result.success ? "success" : "error" });
  };

  return (
    <div className="register-box">
      <h2>Register</h2>

      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
      </select>

      <button onClick={handleSubmit}>Register</button>

      {toast && <Toast {...toast} />}
    </div>
  );
}
