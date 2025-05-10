import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useUserData();
  console.log("user",user, isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 