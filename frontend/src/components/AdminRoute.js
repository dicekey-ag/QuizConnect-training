import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  console.log('AdminRoute - IsAuthenticated:', isAuthenticated);
  console.log('AdminRoute - Role:', role);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return isAuthenticated && role === 'admin' ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default AdminRoute;
