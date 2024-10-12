// AuthGuard.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or some other UI
  }

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default AuthGuard;
