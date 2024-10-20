import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../LayoutPages/Layout";
import { useCart } from "../../contexts/CartContext"; // Import useCart

const ProductDetails = () => {
  const [product, setProduct] = useState({ imagePaths: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const { addToCart, cartItems } = useCart(); // Access addToCart from CartContext

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44378/product/${productId}`
        );

        if (!response.data.isSuccessfull) {
          throw new Error("Product not found");
        }

        const data = response.data.value;
        // console.log(data);
        setProduct(data);

        // Check if imagePaths is available and split it by semicolons
        if (data.imagePaths && typeof data.imagePaths === "string") {
          const imageUrls = data.imagePaths.split(";");
          setAdditionalImages(imageUrls);

          // Set the first image as the selected image by default
          setSelectedImage(`https://localhost:44378/${imageUrls[0]}`);
        } else {
          setAdditionalImages([]);
          setSelectedImage("");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Function to handle thumbnail click
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row p-4 max-w-5xl mx-auto">
        {/* Left Side - Product Thumbnails */}
        <div className="flex flex-col space-y-2 mr-4">
          {additionalImages?.map((img, index) => (
            <img
              key={index}
              src={`https://localhost:44378/${img}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover border border-black rounded-lg shadow-2xl cursor-pointer hover:opacity-80"
              onClick={() =>
                handleThumbnailClick(`https://localhost:44378/${img}`)
              }
            />
          ))}
        </div>

        {/* Middle - Selected Image */}
        <div className="flex-1 mb-4 lg:mr-4">
          <img
            src={selectedImage}
            alt={product.name}
            className="object-cover w-full h-full rounded-2xl border border-black shadow-xl selected-image-3d"
          />
        </div>

        {/* Right Side - Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-lg font-semibold text-green-600 mt-2">
            ${product.price}
          </p>

          {/* Name */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-500 ml-2">(50 reviews)</span>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Product Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => {
                console.log(product);
                // console.log(cartItems);
                return addToCart(product);
              }} // Add product to cart on click
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
