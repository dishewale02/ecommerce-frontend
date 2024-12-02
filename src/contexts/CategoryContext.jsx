import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

//create category context.
const CategoryContext = createContext();

//create hook to use Category context.
export const useCategory = () => useContext(CategoryContext);

// CategoryContext provider component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryResponseErrorMessage, setCategoryResponseErrorMessage] =
    useState(null);

  // Fetch all categories from the API
  const fetchCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const getAllCategoriesResponse = await axios.get(
        "https://localhost:44378/category",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass token in Authorization header
          },
        }
      );

      //save response into categories.
      setCategories(getAllCategoriesResponse.data.value);
      console.log("Category data fetch successfull ");
      // console.log(getAllCategoriesResponse.data.value);
      setCategoryResponseErrorMessage(null);
    } catch (error) {
      // console.log("error in fetching Category data");
      setCategoryResponseErrorMessage(
        getAllCategoriesResponse.data.errorMessage
      );
    }
  };

  // Load categories on mount
  useEffect(() => {
    console.log("category useEffect called.");
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        fetchCategories,
        categoryLoading,
        setCategoryLoading,
        categoryResponseErrorMessage,
        setCategoryResponseErrorMessage,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
