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
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchField, setSearchField] = useState("");
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
      // console.log("Category data fetch successfull ");
      // console.log(getAllCategoriesResponse.data.value);
      setCategoryResponseErrorMessage(null);
    } catch (error) {
      // console.log("error in fetching Category data");
      setCategoryResponseErrorMessage(
        getAllCategoriesResponse.data.errorMessage
      );
    }
  };

  const fetchSearchedProducts = async (category, searchField) => {
    try {
      const getSearchedProductsResponse = await axios.get(
        `https://localhost:44378/product/search-product`,
        {
          params: {
            category: category || "all",
            searchField: searchField || "null",
          },
        }
      );
      console.log(getSearchedProductsResponse.data);
      if (getSearchedProductsResponse.data.isSuccessfull) {
        const value = getSearchedProductsResponse.data.value;
        setSearchedProducts(value);
      } else {
        console.log(getSearchedProductsResponse.data.errorMessage);
        setSearchedProducts(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load categories on mount
  useEffect(() => {
    // console.log("category useEffect called.");
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
        fetchSearchedProducts,
        searchedProducts,
        setSelectedCategory,
        setSearchField,
        selectedCategory,
        searchField,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
