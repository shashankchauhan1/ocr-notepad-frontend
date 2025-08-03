// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // Show a loading state while we verify the session
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child component
  return children;
};

export default ProtectedRoute;