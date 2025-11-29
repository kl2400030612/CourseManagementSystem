import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { Storage } from "../services/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load session on refresh
  useEffect(() => {
    const saved = Storage.get("sessionUser");
    if (saved) setUser(saved);
  }, []);

  const login = (username, password) => {
    const result = authService.login(username, password);
    if (result.success) {
      setUser(result.user);
      Storage.set("sessionUser", result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    Storage.remove("sessionUser");
  };

  const register = (data) => authService.register(data);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
