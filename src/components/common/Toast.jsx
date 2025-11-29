import React, { useEffect, useState } from "react";
import "./toast.css";

export default function Toast({ message, type = "info", duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`toast-container ${type}`}>
      {message}
    </div>
  );
}
