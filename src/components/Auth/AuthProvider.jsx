import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("isLoggedIn");
  });

  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("isLoggedIn", "1");
    else localStorage.removeItem("isLoggedIn");
  }, [isLoggedIn]);

  const login = (username, password) => {
    // simple static check
    if (username === "PsiBorg" && password === "Assignment") {
      setIsLoggedIn(true);
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  };

 const logout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem("isLoggedIn");
};


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
