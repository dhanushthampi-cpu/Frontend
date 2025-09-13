import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    role: null,
    name: null,
    userId: null,
    token: null,
  });

  // Load user info from localStorage on first render
  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (role) setUser({ role, name, userId, token });
  }, []);

  const login = ({ role, name, userId, token }) => {
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    setUser({ role, name, userId, token });
  };

  const logout = () => {
    localStorage.clear();
    setUser({ role: null, name: null, userId: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
