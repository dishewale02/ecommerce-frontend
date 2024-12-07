import Layout from "../LayoutPages/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useCategory } from "../../contexts/CategoryContext";
import { useEffect } from "react";

const ProductList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    searchedProducts,
    selectedCategory,
    searchField,
    fetchSearchedProducts,
  } = useCategory();

  useEffect(() => {
    fetchSearchedProducts(selectedCategory, searchField);
  }, [selectedCategory]);

  // Navigate to product details page
  const handleProductClick = (productId) => {
    navigate(`/product/details/${productId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(searchedProducts) && searchedProducts.length > 0 ? ( // Safeguard against null/undefined productList
            searchedProducts.map((product) => {
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
                  <div
                    className="h-60 w-full mb-4 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={
                        firstImagePath
                          ? `https://localhost:44378${firstImagePath}`
                          : "/placeholder-image.png"
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
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
