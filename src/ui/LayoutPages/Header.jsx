import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import MessageModal from "../MessageModal";
import { useCategory } from "../../contexts/CategoryContext";

const Header = () => {
  const { isAuthenticated, checkAuthUser, logout, isAdmin } = useAuth();
  const { cartCount } = useCart(); // Get cart count from CartContext
  const {
    categories,
    fetchSearchedProducts,
    setSearchField,
    setSelectedCategory,
    selectedCategory,
    searchField,
  } = useCategory(); // Get categories from CategoryContext
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  // Navigate to selected category and search products
  const handleSearch = (event) => {
    event.preventDefault();
    fetchSearchedProducts(selectedCategory, searchField);
    handleNavigate(
      `/products/${selectedCategory || "all"}/${searchField || "null"}`
    );
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  // Navigate to account details
  const handleAccountClick = () => {
    checkAuthUser();
    navigate("/account-details");
  };

  // Navigate to different sections
  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-scroll text-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img
          src={"public/icons/Web-Logo/Comp-logo1.png"}
          alt="Website Logo"
          className="h-20 cursor-pointer"
          onClick={() => handleNavigate("/")}
        />

        {/* Add Product Button (Admin Only) */}
        {isAdmin && (
          <button
            className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={() => handleNavigate("/products/create-new")}
          >
            Add New Product
          </button>
        )}

        {/* Admin Section Button (Admin Only) */}
        {isAdmin && (
          <button
            className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={() => handleNavigate("/admin")}
          >
            Admin Section
          </button>
        )}

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-grow flex items-center space-x-4"
        >
          <div className="mb-6">
            <label className="mr-4 font-medium">Select Category</label>
            <select
              onChange={handleCategoryChange}
              className="border rounded-md p-2"
              value={selectedCategory}
            >
              <option value="all">All</option>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((c, index) => (
                  <option key={index} value={c.name}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option>No categories available</option>
              )}
            </select>
          </div>
          <input
            type="text"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Search
          </button>
        </form>

        {/* Account and Cart */}
        <div className="flex items-center space-x-6">
          <button
            className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
            onClick={handleAccountClick}
          >
            Account
          </button>
          <button
            className="relative flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => handleNavigate("/cart")}
          >
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l1.6-8H5.4L7 13zm5 8a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            <span className="ml-2">Cart</span>

            {/* Cart Count */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {cartCount}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <button
              className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
              onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <button
              className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
              onClick={() => handleNavigate("/sign-in")}
            >
              LogIn
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-gray-800 py-2">
        <div className="container mx-auto px-4 flex space-x-6">
          <a href="#" className="text-sm text-white hover:text-yellow-400">
            Today's Deals
          </a>
          <a href="#" className="text-sm text-white hover:text-yellow-400">
            Customer Service
          </a>
          <a href="#" className="text-sm text-white hover:text-yellow-400">
            Gift Cards
          </a>
          <a href="#" className="text-sm text-white hover:text-yellow-400">
            Registry
          </a>
          <a href="#" className="text-sm text-white hover:text-yellow-400">
            Sell
          </a>
        </div>
      </nav>

      {/* Message Modal */}
      {showModal && (
        <MessageModal message={message} onClose={() => setShowModal(false)} />
      )}
    </header>
  );
};

export default Header;
