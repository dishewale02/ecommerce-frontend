import React, { useState, useEffect } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";

const MainContent = () => {
  const { categories } = useCategory();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const { addToCart } = useCart();

  const onCategoryUpdateSelection = async (selectedCategory, searchField) => {
    console.log(selectedCategory + " " + searchField);
    navigate(`/products/${selectedCategory}/${searchField}`);
  };

  const GetProductList = async () => {
    const fetchAllProductResponse = await axios.get(
      `https://localhost:44378/product`
    );
    // console.log(fetchAllProductResponse.data.value);
    setProducts(fetchAllProductResponse.data.value);
    setRandomProducts(getRandomProducts(fetchAllProductResponse.data.value)); // Get random products
  };

  const getRandomProducts = (productsArray) => {
    // Shuffle the products array
    const shuffled = productsArray.sort(() => 0.5 - Math.random());

    // Slice the first 8 products
    // console.log(shuffled.slice(0, 8));
    return shuffled.slice(0, 8);
  };

  useEffect(() => {
    GetProductList();
  }, []);

  const categoryOnSelectHandler = async (categoryName) => {
    const value = categoryName;
    const searchField = null;
    console.log(value + " " + searchField)
    await onCategoryUpdateSelection(value, searchField);
  };

  const onProductCardClickHandler = async (product) => {
    navigate(`/product/details/${product.id}`);
  };

  return (
    <Layout>
      <main>
        {/* Hero Banner */}
        <section className="relative">
          <img
            src="https://via.placeholder.com/1920x500?text=Amazon+Style+Banner"
            alt="Hero Banner"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Welcome to MyShop</h2>
          </div>
        </section>

        {/* Category Section */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                value={category.name}
                onClick={() => {
                  categoryOnSelectHandler(category.name);
                }}
                className="bg-gray-100 p-4 text-center rounded-lg hover:bg-gray-200 transition"
              >
                <img
                  src={`https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so`}
                  alt={category.id}
                  className="mb-4 mx-auto"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </section>

        {/* Product Recommendations */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Recommended for You
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => {
              // console.log(product);
              // Split the imagePaths string by semicolon and get the first image
              const iPaths = product.imagePaths
                ? product.imagePaths.split(";")
                : [];
              const firstImagePath = iPaths.length > 0 ? iPaths[0] : null;

              return (
                <div
                  key={product.id}
                  className="border p-4 rounded-md shadow-md bg-white transition-transform transform hover:scale-105"
                >
                  <img
                    key={product.id}
                    onClick={() => {
                      onProductCardClickHandler(product);
                    }}
                    src={
                      firstImagePath
                        ? `https://localhost:44378${firstImagePath}`
                        : "" // Default image if no image path is provided
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">
                    Category: {product.category}
                  </p>
                  <p className="text-green-600 font-medium mb-2">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      console.log(product);
                      // console.log(cartItems);
                      return addToCart(product);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default MainContent;
