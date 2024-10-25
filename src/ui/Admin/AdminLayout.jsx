// src/layouts/AdminLayout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-300 shadow-md">
        <div className="p-4 text-2xl font-bold text-gray-800 text-center">
          Admin Portal
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="block p-4 text-gray-800 hover:bg-purple-200 transition duration-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block p-4 text-gray-800  hover:bg-purple-200 transition duration-200"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="block p-4 text-gray-800  hover:bg-purple-200 transition duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block p-4 text-gray-800  hover:bg-purple-200 transition duration-200"
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
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          {!isAuthenticated && (
            <button
              className="text-lg text-black  hover:bg-purple-500 px-3 py-2 bg-sky-600 rounded-md transition duration-200 ease-in-out"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              LogIn
            </button>
          )}
          {isAuthenticated && (
            <button
              className="text-lg text-black  hover:bg-purple-500 px-3 py-2 bg-sky-600 rounded-md transition duration-200 ease-in-out"
              onClick={() => logout()}
            >
              LogOut
            </button>
          )}
          <button
            className="text-lg text-black  hover:bg-purple-500 px-3 py-2 bg-sky-600 rounded-md transition duration-200 ease-in-out"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </header>
        <div className="bg-white p-4 rounded shadow-md flex-1">
          <Outlet /> {/* Renders child routes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
