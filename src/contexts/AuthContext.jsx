import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const INITIAL_USER = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phone: "",
  role: "",
};

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (credentials) => {
    setResponseErrorMessage(""); // Reset error message before login attempt

    try {
      const response = await axios.post(
        "https://localhost:44378/auth/log-in",
        credentials
      );
      //check if logged in or not.
      if (response.data.isSuccessfull) {
        setIsAuthenticated(true);
        console.log(response.data.value);

        localStorage.setItem("accessToken", response.data.value.accessToken); // Save Access Token in local storage
        localStorage.setItem("refreshToken", response.data.value.refreshToken); // Save Refresh Token in local storage

        // console.log(localStorage.getItem("accessToken"));
        // console.log(localStorage.getItem("refreshToken"));

        return {
          isSuccessfull: true,
          value: response.data.value, // Return user details or any relevant data
          errorMessage: "", // No error message
        };
      } else {
        console.log(response.data.errorMessage);
        setResponseErrorMessage(response.data.errorMessage);
        return {
          isSuccessfull: false,
          value: null, // No data if there was an error
          errorMessage: response.data.errorMessage, // Return the error message
        };
      }
    } catch (error) {
      console.error("Login failed", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setResponseErrorMessage(errorMessage); // Handle unexpected errors
      return {
        isSuccessfull: false,
        value: null,
        errorMessage: errorMessage, // Return unexpected error message
      };
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("accessToken"); // Remove token from local storage
    localStorage.removeItem("refreshToken"); // Remove token from local storage
  };

  const checkAuthUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const response = await axios.get(
          "https://localhost:44378/auth/get-user-details",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        //check if the user is admin.
        if (response.data.value.role.toUpperCase() === "ADMIN") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        // console.log(localStorage.getItem("accessToken"));
        // console.log(localStorage.getItem("refreshToken"));

        setUser(response.data.value);
        // console.log(response.data.value);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          // If 401 Unauthorized, try to refresh the tokens
          try {
            await refreshTokens(); // Refresh access token using the refresh token

            // Retry fetching user details after refreshing tokens
            const response = await axios.get(
              "https://localhost:44378/auth/get-user-details",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                }, // Use the new access token
              }
            );
            setUser(response.data.value);
            // console.log("was re-authoriesed");
            // console.log(response.data.value);
            setIsAuthenticated(true);
          } catch (refreshError) {
            console.error("Failed to refresh tokens", refreshError);
            logout(); // Logout if token refresh fails
          }
        } else {
          console.error("Failed to fetch user details", error);
          logout(); // Logout on any other error
        }
        setLoading(false);
      }
    }
    setLoading(false); // Set loading to false after check completes
  };

  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const newTokensResponse = await axios.post(
          "https://localhost:44378/auth/request-token",
          { refreshToken }
        );

        if (newTokensResponse.data.isSuccessfull) {
          //save tokens to local storage.
          localStorage.setItem(
            "accessToken",
            newTokensResponse.data.value.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            newTokensResponse.data.value.refreshToken
          );
        }
      } catch (error) {
        console.error("user is not logged in.");
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      checkAuthUser();
    } else {
      setLoading(false); // If no token, we are not loading
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        User,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        loading,
        login,
        logout,
        responseErrorMessage,
        checkAuthUser,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
