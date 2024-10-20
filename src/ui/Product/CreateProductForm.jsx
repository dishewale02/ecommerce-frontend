import React, { useState } from "react";
import axios from "axios";
import Layout from "../LayoutPages/Layout";
import { useCategory } from "../../contexts/CategoryContext";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle multiple image file changes
  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const onCategorySelectionHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("CategoryId", selectedCategory);

    // Append multiple images to form data
    images.forEach((image) => {
      formData.append(`Images`, image);
    });

    try {
      const accessTokenValue = localStorage.getItem("accessToken");
      // console.log(formData);
      const response = await axios.post(
        "https://localhost:44378/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      if (response.data.sSuccessfull) {
        setSuccess("Product created successfully!");
        // Reset form fields
        setName("");
        setPrice("");
        setDescription("");
        setImages([]);
      } else {
        setSuccess(response.data.errorMessage);
      }
    } catch (error) {
      setError("Error creating product. Please try again.");
      console.error(error);
    }
  };

  return (
    <Layout>
      y
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>
          <select
            onChange={onCategorySelectionHandler}
            className="border rounded-md p-2 mb-4"
            value={selectedCategory}
          >
            <option value="All">All</option>
            {categories?.map((c, index) => (
              <option key={index} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              required
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProductForm;
