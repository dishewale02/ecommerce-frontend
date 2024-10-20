import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext"; // Import useCart

const Header = () => {
  const { isAuthenticated, checkAuthUser } = useAuth();
  const { logout, isAdmin } = useAuth();
  const { cartCount } = useCart(); // Get cart count from CartContext
  const navigate = useNavigate();

  const onLogoutClickHandler = async () => {
    await logout();
    navigate("/sign-in");
  };

  const handleOnAccountButtonClick = async () => {
    checkAuthUser();
    navigate("/account-details");
  };

  const onLoginClickHandler = async () => {
    navigate("/sign-in");
  };

  const onMyShopClickHandler = async () => {
    navigate("/");
  };

  const onAddNewProductClickHandler = async () => {
    navigate("/products/create-new");
  };

  const onAdminSectionClickHandler = async () => {
    navigate("/admin");
  };

  const onShowCartHandleClick = async () => {
    navigate("/cart");
  };

  return (
    <header className="bg-yellow-400 text-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <img
          src="public/img/Web-Logo/Comp-logo2.png"
          alt="Website Logo"
          className="h-20 cursor-pointer"
          onClick={onMyShopClickHandler}
        />
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md">
          <button
            className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={onAddNewProductClickHandler}
          >
            Add New Product
          </button>
        </div>
        {isAdmin && (
          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md">
            <button
              className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
              onClick={onAdminSectionClickHandler}
            >
              Admin Section
            </button>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="flex-grow flex items-center">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200 ease-in-out">
              Search
            </button>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-6">
            <button
              className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
              onClick={handleOnAccountButtonClick}
            >
              Account
            </button>
            <button className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out">
              Orders
            </button>
            <button
              className="relative flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={onShowCartHandleClick}
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

              {/* Cart count */}
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {cartCount}
                </span>
              )}
            </button>
            {!isAuthenticated && (
              <button
                className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
                onClick={onLoginClickHandler}
              >
                LogIn
              </button>
            )}
            {isAuthenticated && (
              <button
                className="text-lg text-gray-800 hover:text-blue-400 px-3 py-2 bg-gray-300 rounded-md transition duration-200 ease-in-out"
                onClick={onLogoutClickHandler}
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
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
    </header>
  );
};

export default Header;
