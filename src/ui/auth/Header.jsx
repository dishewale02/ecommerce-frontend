import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">MyShop</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-l-md border-0"
            />
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-r-md">
              Search
            </button>
          </div>
          {/* Account and Cart */}
          <div className="flex items-center space-x-6">
            <button className="text-lg hover:text-yellow-400 px-3 py-2 bg-gray-800 rounded-md">
              Account
            </button>
            <button className="text-lg hover:text-yellow-400 px-3 py-2 bg-gray-800 rounded-md">
              Orders
            </button>
            <button className="text-lg hover:text-yellow-400 px-3 py-2 bg-gray-800 rounded-md">
              Cart
            </button>
          </div>
        </div>
      </div>
      <nav className="bg-gray-800 py-2">
        <div className="container mx-auto px-4 flex space-x-6">
          <a href="#" className="text-sm hover:text-yellow-400">
            Today's Deals
          </a>
          <a href="#" className="text-sm hover:text-yellow-400">
            Customer Service
          </a>
          <a href="#" className="text-sm hover:text-yellow-400">
            Gift Cards
          </a>
          <a href="#" className="text-sm hover:text-yellow-400">
            Registry
          </a>
          <a href="#" className="text-sm hover:text-yellow-400">
            Sell
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
