import React, { useState, useEffect, act } from "react";
import axios from "axios";
import MessageModal from "../../MessageModal";

const fetchNonDeletedAndActiveProducts = async () => {
  try {
    const getProductsResponse = await axios.get(
      "https://localhost:44378/product"
    );
    // console.log(getProductsResponse.data.value);

    if (!getProductsResponse.data.isSuccessfull) {
      return null;
    }

    return getProductsResponse.data.value;
  } catch (error) {
    setMessage("Failed to fetch nonDeletedAndActiveProducts.");
  }
};

const fetchDeletedAndNonActiveProducts = async () => {
  try {
    const getProductsResponse = await axios.get(
      "https://localhost:44378/product/get-deleted-and-non-active-products"
    );
    // console.log(getProductsResponse.data.value);

    if (!getProductsResponse.data.isSuccessfull) {
      return null;
    }

    return getProductsResponse.data.value;
  } catch (error) {
    setMessage("Failed to fetch nonDeletedAndActiveProducts.");
  }
};

const deleteProduct = async (productId) => {
  try {
    // console.log(productId);

    const accessToken = localStorage.getItem("accessToken");
    const activateAPIResponse = await axios.delete(
      `https://localhost:44378/product/${"Id?" + "Id=" + productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the Authorization header
        },
      }
    );
    // console.log("Product deleted: " + activateAPIResponse.data.value.name);
    if (activateAPIResponse.data.isSuccessfull) {
    } else {
      //   console.log(activateAPIResponse.data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
};

const activateDeletedProduct = async (productId) => {
  try {
    // console.log(userId);

    const accessToken = localStorage.getItem("accessToken");
    const activateAPIResponse = await axios.delete(
      `https://localhost:44378/product/activate-deleted-product?id=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the Authorization header
        },
      }
    );
    // console.log("Product activated: " + activateAPIResponse.data.value.Name);
    if (activateAPIResponse.data.isSuccessfull) {
    } else {
      //   console.log(activateAPIResponse.data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
};

const AdminProductsList = () => {
  const [nonDeletedAndActiveProducts, setNonDeletedAndActiveProducts] =
    useState([]);
  const [deletedAndNonActiveProducts, setDeletedAndNonActiveProducts] =
    useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowDeletedTable, setIsShowDeletedTable] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      // Fetch nonDeletedAndActiveProducts from API
      const nonDeletedAndActiveProducts =
        await fetchNonDeletedAndActiveProducts();

      const deletedAndNonActiveProducts =
        await fetchDeletedAndNonActiveProducts();

      //   console.log(getAllProducts);

      //   console.log(deletedAndNonActiveProducts);

      if (nonDeletedAndActiveProducts != null) {
        // console.log(getAllProducts);

        setNonDeletedAndActiveProducts(nonDeletedAndActiveProducts);
        setDeletedAndNonActiveProducts(deletedAndNonActiveProducts);
      }
    };
    getProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/nonDeletedAndActiveProducts",
        newProduct
      );
      if (response.data.success) {
        setMessage("Product added successfully!");
        fetchNonDeletedAndActiveProducts(); // Reload nonDeletedAndActiveProducts after adding
      } else {
        setMessage("Failed to add product.");
      }
    } catch (error) {
      setMessage("Error adding product.");
    }
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/nonDeletedAndActiveProducts/${updateProduct.id}`,
        updateProduct
      );
      if (response.data.success) {
        setMessage("Product updated successfully!");
        fetchNonDeletedAndActiveProducts(); // Reload nonDeletedAndActiveProducts after update
      } else {
        setMessage("Failed to update product.");
      }
    } catch (error) {
      setMessage("Error updating product.");
    }
    setIsUpdating(false);
  };

  const handleUpdateButtonClick = (product) => {
    setUpdateProduct(product);
    setIsUpdating(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Make an API call to delete the product
      await deleteProduct(productId);

      // Remove the deleted product from the nonDeletedAndActiveProducts state
      setNonDeletedAndActiveProducts((prevProducts) => {
        // Ensure prevProducts is always an array
        if (!Array.isArray(prevProducts)) return [];
        return prevProducts.filter((product) => product.id !== productId);
      });

      // Fetch the product from the previous state before deletion
      const productToDelete = nonDeletedAndActiveProducts.find(
        (product) => product.id === productId
      );

      // Add the deleted product to the deletedAndNonActiveProducts state
      if (productToDelete) {
        setDeletedAndNonActiveProducts((prevProducts) => {
          // Ensure prevProducts is always an array
          if (!Array.isArray(prevProducts)) return [];
          return [...prevProducts, productToDelete];
        });
      }

      setMessage("Product deleted successfully: " + productToDelete.name);
      setShowModal(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product.");
      setShowModal(true);
    }
  };

  const handleActivateDeletedProduct = async (productId) => {
    try {
      // Make an API call to activate the deleted product
      await activateDeletedProduct(productId);

      // Remove the activated product from the deletedAndNonActiveProducts state
      setDeletedAndNonActiveProducts((prevProducts) => {
        // Ensure prevProducts is always an array
        if (!Array.isArray(prevProducts)) return [];
        return prevProducts.filter((product) => product.id !== productId);
      });

      // Fetch the product from the previous state before activation
      const productToActivate = deletedAndNonActiveProducts.find(
        (product) => product.id === productId
      );

      // Add the activated product to the nonDeletedAndActiveProducts state
      if (productToActivate) {
        setNonDeletedAndActiveProducts((prevProducts) => {
          // Ensure prevProducts is always an array
          if (!Array.isArray(prevProducts)) return [];
          return [...prevProducts, productToActivate];
        });
      }

      setMessage("Product activated successfully: " + productToActivate.name);
      setShowModal(true);
    } catch (error) {
      console.error("Error activating product:", error);
      setMessage("Error activating product.");
      setShowModal(true);
    }
  };

  const handleIsShowDeletedProductsTable = () => {
    setIsShowDeletedTable(!isShowDeletedTable);
  };

  const handleExportActiveProducts = async () => {
    try {
      //get access token.
      const accessToken = localStorage.getItem("accessToken");

      const folderPath =
        "C:\\Users\\Dipak Shewale\\Desktop\\STUDY\\export files";
      //send request in backend.
      const exportProductsResponse = await axios.get(
        `https://localhost:44378/admin/export-all-active-users?folderPath=${folderPath}`
      );

      // console.log(exportProductsResponse.data);
      if (exportProductsResponse.data.isSuccessfull) {
        setMessage(
          "Product List Exported at " + exportProductsResponse.data.value
        );
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      {/* <h2 className="text-xl font-semibold mb-4">{message}</h2> */}
      {!isShowDeletedTable && (
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsAddingProduct(true)}
        >
          Add New Product
        </button>
      )}
      <button
        className="mb-6 ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => handleIsShowDeletedProductsTable()}
      >
        Show/Hide Deleted Products
      </button>
      <button
        className="mb-6 ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => handleExportActiveProducts()}
      >
        Export Active Products Table
      </button>

      {isAddingProduct && (
        <form
          onSubmit={handleAddProduct}
          className="mb-6 p-4 border rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">New Product Form</h3>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => setIsAddingProduct(false)}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </form>
      )}

      {isUpdating && (
        <form
          onSubmit={handleUpdateProduct}
          className="mb-6 p-4 border rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Update Product Form</h3>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={updateProduct.name}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, name: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={updateProduct.description}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={updateProduct.price}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, price: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={updateProduct.quantity}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, quantity: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={updateProduct.category}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, category: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => setIsUpdating(false)}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </form>
      )}

      {!isShowDeletedTable &&
        (nonDeletedAndActiveProducts &&
        Array.isArray(nonDeletedAndActiveProducts) &&
        nonDeletedAndActiveProducts.length > 0 ? (
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Quantity
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {nonDeletedAndActiveProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.categoryId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <button
                      className="text-blue-600 hover:underline mr-4"
                      onClick={() => handleUpdateButtonClick(product)}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        console.log(product.id);
                        handleDeleteProduct(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">
            No nonDeletedAndActiveProducts available.
          </p>
        ))}
      {isShowDeletedTable && (
        <div>
          <div>Deleted Products</div>
        </div>
      )}
      {isShowDeletedTable &&
        (deletedAndNonActiveProducts &&
        Array.isArray(deletedAndNonActiveProducts) &&
        deletedAndNonActiveProducts.length > 0 ? (
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Quantity
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deletedAndNonActiveProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {product.categoryId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => handleActivateDeletedProduct(product.id)}
                    >
                      Activate Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">
            No Deleted And Non-Active Products available.
          </p>
        ))}
      {/* Show modal if there's a message */}
      {showModal && (
        <MessageModal message={message} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default AdminProductsList;
