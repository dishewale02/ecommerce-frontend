import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const INITIAL_USER = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phone: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://localhost:44378/auth/log-in",
        credentials
      );
      setIsAuthenticated(true);
      console.log(response.data.value.accessToken);
      localStorage.setItem("token", response.data.value.accessToken); // Save token in local storage
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Remove token from local storage
  };

  const checkAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          "https://localhost:44378/auth/get-user-details",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        console.log(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to authenticate user", error);
        logout(); // Logout if the user can't be authenticated
      }
    }
    setLoading(false); // Set loading to false after check completes
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuthUser();
    } else {
      setLoading(false); // If no token, we are not loading
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
