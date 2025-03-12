import React, { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");

  // Simulating a login/logout function
  const login = (companyData) => {
    setCompany(companyData);
    setCompanyName(companyData.companyName || "");
    setIsAuthenticated(true);
  };
  const logout = () => {
    setCompany(null);
    setCompanyName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, company, companyName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
