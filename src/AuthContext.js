import React, { createContext, useState } from 'react';
import { login as logininApi } from './api/api';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async (credentials) => {
    try {
      await logininApi(credentials);

      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
    } catch (error) {
      throw error;
    }

  };

  const logout = () => {
    // Clear any auth tokens, user data, etc.
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
