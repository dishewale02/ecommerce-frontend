import React, { useEffect, useState } from "react";
import Layout from "../LayoutPages/Layout";
import axios from "axios";
import { useCategory } from "../../contexts/CategoryContext";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext"; // Import useCart

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const { categories } = useCategory();
  const navigate = useNavigate();
  const { category } = useParams();
  const { addToCart } = useCart(); // Get addToCart from CartContext

  const getProducts = async () => {
    // console.log(category);

    const fetchFilteredProductResponse = await axios.get(
      `https://localhost:44378/product/search-by-category` +
        (category ? `?categoryName=${category}` : `?categoryName=all`)
    );

    // console.log(fetchFilteredProductResponse.data);

    setProductList(fetchFilteredProductResponse.data.value);
    return fetchFilteredProductResponse.data.value;
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  const onCategoryUpdateSelection = async (selectedCategory) => {
    // console.log(selectedCategory);

    if (selectedCategory === "All") {
      navigate("/products");
    } else {
      navigate(`/products/${selectedCategory}`);
    }
  };

  const categoryOnSelectHandler = async (e) => {
    const value = e.target.value;
    await onCategoryUpdateSelection(value);
  };

  const onProductCardClickHandler = async (product) => {
    navigate(`/product/details/${product.id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="mr-4 font-medium">Filter by Category:</label>
          <select
            onChange={categoryOnSelectHandler}
            className="border rounded-md p-2"
            value={category}
          >
            <option value="All">All</option>
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

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList &&
            productList.map((product) => {
              const imagePaths = product.imagePaths
                ? product.imagePaths.split(";")
                : [];
              const firstImagePath =
                imagePaths.length > 0 ? imagePaths[0] : null;

              return (
                <div
                  key={product.id}
                  className="border p-4 rounded-md shadow-md bg-white transition-transform transform hover:scale-105 product-card"
                >
                  <div className="h-60 w-full mb-4">
                    <img
                      onClick={() => onProductCardClickHandler(product)}
                      src={
                        firstImagePath
                          ? `https://localhost:44378${firstImagePath}`
                          : ""
                      }
                      alt={product.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-2 text-center">
                    Category: {product.category}
                  </p>
                  <p className="text-green-600 font-medium mb-2 text-center">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={() => addToCart(product)} // Add to cart when button is clicked
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
