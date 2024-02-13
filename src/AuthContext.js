import React, { createContext, useState } from 'react';
import { login as logininApi, logout as LogoutApi } from './api/api';

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

  const logout = async() => {
    try {
      await LogoutApi();
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
