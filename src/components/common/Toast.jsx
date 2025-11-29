import React, { useEffect } from "react";

export default function Toast({ message, type = "info", duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("toast-container");
      if (el) el.remove();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      id="toast-container"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: type === "error" ? "#f44336" : "#4caf50",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}
