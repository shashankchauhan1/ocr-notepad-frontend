import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // This function will check the session with the backend
  const verifySession = async () => {
    try {
      await axios.get('https://ocr-notepad-backend.onrender.com/api/auth/verify', { withCredentials: true });
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Session verification failed:', error.response?.data?.message);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Run the verification check on component mount (when the app loads or reloads)
  useEffect(() => {
    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};