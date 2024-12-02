import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCategory } from "../../../contexts/CategoryContext";
import axios from "axios";
import MessageModal from "../../MessageModal";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const INITIAL_CATEGORY_GRAPH_DATA = [
  {
    categoryName: "",
    categoryCount: 0,
  },
];

const fetchUserData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const allUserDataResponse = await axios.get(
      `https://localhost:44378/admin/get-all-nondeleted-active-users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (allUserDataResponse.data.isSuccessfull) {
      return allUserDataResponse.data.value; // Assuming `value` contains user data
    } else {
      setMessage(
        allUserDataResponse.data.errorMessage || "Failed to fetch users."
      );
      setShowModal(true);
      return [];
    }
  } catch (error) {
    setMessage(error.message || "An error occurred while fetching users.");
    setShowModal(true);
    return [];
  }
};

const Dashboard = () => {
  const { categories, fetchCategories } = useCategory();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryGraphData, setCategoryGraphData] = useState(
    INITIAL_CATEGORY_GRAPH_DATA
  );
  const [userGraphData, setUserGraphData] = useState([]);

  // Fetch user data

  useEffect(() => {
    const fetchData = async () => {
      // Map category data
      if (categories.length > 0) {
        const categoryData = categories.map((category) => ({
          categoryName: category.name,
          categoryCount: category.productCount,
        }));
        setCategoryGraphData(categoryData);
      }

      // Fetch and map user data
      const fetchedUserData = await fetchUserData();

      if (fetchedUserData && fetchedUserData.length > 0) {
        const userData = fetchedUserData.reduce((acc, user) => {
          const userRole = user.role || "Unknown";
          const existing = acc.find((u) => u.userTypeName === userRole);
          if (existing) {
            existing.userCount += 1;
          } else {
            acc.push({ userTypeName: userRole, userCount: 1 });
          }
          return acc;
        }, []);
        setUserGraphData(userData);
      }
    };

    fetchData();
  }, [categories]);

  const refreshButtonHandler = () => {
    fetchCategories();
    setMessage("Data refresh done.");
    setShowModal(true);
  };

  // Data for Users Chart
  const userLabels = userGraphData.map((user) => user.userTypeName);
  const userCounts = userGraphData.map((user) => user.userCount);

  const userData = {
    labels: userLabels,
    datasets: [
      {
        label: "Users by Role",
        data: userCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Products by Category Chart
  const categoryLabels = categoryGraphData.map((cat) => cat.categoryName);
  const categoryCounts = categoryGraphData.map((cat) => cat.categoryCount);

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Products by Category",
        data: categoryCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important to set this to false
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      <button
        className="mb-6 ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => refreshButtonHandler()}
      >
        Refresh
      </button>
      {/* Products by Category Graph */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Products by Category</h3>
        <div style={{ height: "200px", width: "100%" }}>
          <Bar data={categoryData} options={options} />
        </div>
      </div>

      {/* Users Graph */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">User Count by Role</h3>
        <div style={{ height: "200px", width: "100%" }}>
          <Bar data={userData} options={options} />
        </div>
      </div>

      {/* Show modal if there's a message */}
      {showModal && (
        <MessageModal message={message} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
