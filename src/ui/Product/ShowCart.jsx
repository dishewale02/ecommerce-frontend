import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"; // Assuming you have this context set up
import Layout from "../LayoutPages/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const ShowCart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } =
    useCart(); // Added updateCartItemQuantity
  const navigate = useNavigate();
  const [categoryNames, setCategoryNames] = useState({}); // State to hold category names

  // Function to group cart items by their ID
  const groupCartItems = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Sum up the quantity
      } else {
        acc.push({ ...item }); // Add new item to the array
      }
      return acc;
    }, []);
    return groupedItems;
  };

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const categories = {};
      const uniqueCategoryIds = [
        ...new Set(cartItems.map((item) => item.categoryId)),
      ];

      for (const categoryId of uniqueCategoryIds) {
        try {
          const response = await axios.get(
            `https://localhost:44378/Category/get-category`,
            {
              params: {
                categoryId,
              },
            }
          );
          console.log(response.data.value);
          if (response.data.isSuccessfull) {
            categories[categoryId] = response.data.value.name;
          }
        } catch (error) {
          // console.error(`Error fetching category ${categoryId}:`, error);
        }
      }
      setCategoryNames(categories);
    };

    if (cartItems.length > 0) {
      fetchCategoryNames();
    }
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // New function to calculate total items
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1 || isNaN(newQuantity)) {
      return; // Prevent invalid or negative quantities
    }
    updateCartItemQuantity(id, newQuantity); // Call function from the context
  };

  const groupedCartItems = groupCartItems(cartItems); // Group the cart items

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <p className="text-lg font-semibold">
            Total Products: {calculateTotalItems()} {/* Show total items */}
          </p>
        </div>

        {groupedCartItems.length === 0 ? (
          <p className="text-lg text-gray-700">Your cart is currently empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedCartItems.map((item) => {
                const iPaths = item.imagePaths
                  ? item.imagePaths.split(";")
                  : [];
                const firstImagePath = iPaths.length > 0 ? iPaths[0] : null;

                const categoryN =
                  categoryNames[item.categoryId] || "Loading...";

                return (
                  <div
                    key={item.id}
                    className="border p-4 rounded-md shadow-md bg-white"
                  >
                    <div className="h-48 w-full mb-4">
                      <img
                        src={
                          firstImagePath
                            ? `https://localhost:44378${firstImagePath}`
                            : ""
                        }
                        alt={item.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-2">Category: {categoryN}</p>
                    <p className="text-green-600 font-medium mb-2">
                      Rs. {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Control */}
                    <div className="flex items-center mb-2">
                      <button
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="mx-2 border rounded w-16 text-center"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <button
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Cart Total */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">
                Total: Rs. {calculateTotal()}
              </h2>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="mt-4 ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShowCart;
