// AuthGuard.js
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Layout from "../ui/LayoutPages/Layout";

const AuthGuard = ({ children, roles }) => {
  const { isAuthenticated, loading, User } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or some other UI
  }

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/sign-in" />;
  }

  if (roles && !roles.includes(User.role.toUpperCase())) {
    console.log(User.role);
    // console.log(roles);
    return (
      <Layout>
        <div>You are not authorized!!</div>
      </Layout>
    );
  }

  localStorage.setItem("isAdmin", true);

  return children;
};

export default AuthGuard;
