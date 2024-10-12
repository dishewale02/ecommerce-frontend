import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Get to Know Us
            </h4>
            <ul>
              <li className="hover:text-yellow-400">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Careers</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Press Releases</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Make Money with Us
            </h4>
            <ul>
              <li className="hover:text-yellow-400">
                <a href="#">Sell on MyShop</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Become an Affiliate</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Advertise Your Products</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Help</h4>
            <ul>
              <li className="hover:text-yellow-400">
                <a href="#">Your Account</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Returns Centre</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Customer Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Let Us Help You
            </h4>
            <ul>
              <li className="hover:text-yellow-400">
                <a href="#">Shipping Rates</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Returns</a>
              </li>
              <li className="hover:text-yellow-400">
                <a href="#">Order Tracking</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-500">
          &copy; 2024 MyShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
