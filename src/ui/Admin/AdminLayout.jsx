// src/layouts/AdminLayout.js
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const AdminLayout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // Access darkMode and toggleDarkMode

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-64 shadow-md ${
          darkMode ? "bg-gray-900" : "bg-neutral-300"
        }`}
      >
        <div
          className={`p-4 text-2xl font-bold text-center ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Admin Portal
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className={`block p-4 ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-sky-600"
                } transition duration-200`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`block p-4 ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-purple-200"
                } transition duration-200`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className={`block p-4 ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-purple-200"
                } transition duration-200`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`block p-4 ${
                  darkMode
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-800 hover:bg-purple-200"
                } transition duration-200`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <button
                className={`text-lg px-3 py-2 rounded-md transition duration-200 ease-in-out ${
                  darkMode
                    ? "text-white bg-gray-700 hover:bg-gray-600"
                    : "text-black bg-sky-600 hover:bg-purple-500"
                }`}
                onClick={() => navigate("/sign-in")}
              >
                LogIn
              </button>
            )}
            {isAuthenticated && (
              <button
                className={`text-lg px-3 py-2 rounded-md transition duration-200 ease-in-out ${
                  darkMode
                    ? "text-white bg-gray-700 hover:bg-gray-600"
                    : "text-black bg-sky-600 hover:bg-purple-500"
                }`}
                onClick={logout}
              >
                LogOut
              </button>
            )}
            <button
              className={`text-lg px-3 py-2 rounded-md transition duration-200 ease-in-out ${
                darkMode
                  ? "text-white bg-gray-700 hover:bg-gray-600"
                  : "text-black bg-sky-600 hover:bg-purple-500"
              }`}
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </header>
        <div
          className={`p-4 rounded shadow-md flex-1 ${
            darkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <Outlet />
          {/* Renders child routes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
