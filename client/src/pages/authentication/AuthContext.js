import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [loading, setLoading] = useState(true); // Prevents flickering on refresh

  useEffect(() => {
    const storedCompany = localStorage.getItem("company");
    if (storedCompany) {
      const companyData = JSON.parse(storedCompany);
      setCompany(companyData);
      setCompanyName(companyData.companyName || "");
      setBusinessId(companyData.businessId || "");
      setIsAuthenticated(true);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  const login = (companyData) => {
    setCompany(companyData);
    setCompanyName(companyData.companyName || "");
    setBusinessId(companyData.businessId || "");
    setIsAuthenticated(true);
    localStorage.setItem("company", JSON.stringify(companyData));
  };

  const logout = () => {
    setCompany(null);
    setCompanyName("");
    setBusinessId("");
    setIsAuthenticated(false);
    localStorage.removeItem("company");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        company,
        companyName,
        businessId,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children} {/* Prevent rendering until loading is done */}
    </AuthContext.Provider>
  );
};
