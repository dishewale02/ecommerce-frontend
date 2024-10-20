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

const Dashboard = () => {
  const { categories } = useCategory();
  const [categoryGraphData, setCategoryGraphData] = useState(
    INITIAL_CATEGORY_GRAPH_DATA
  );

  useEffect(() => {
    if (categories.length > 0) {
      const categoryData = categories.map((category) => ({
        categoryName: category.name,
        categoryCount: 5, // Assuming categoryCount here, adjust this to dynamic count if needed
      }));

      // Update the state with the complete category data
      setCategoryGraphData(categoryData);
    }
  }, [categories]);

  const refreshButtonHandler = () => {
    console.log(categoryGraphData);
  };

  // Sample data
  const currentUserCount = 100; // Example current user count
  const productCount = 50; // Example product count

  // Data for Users Chart
  const userData = {
    labels: ["Users"],
    datasets: [
      {
        label: "Count",
        data: [currentUserCount],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Data for Products Chart
  const productData = {
    labels: ["Products"],
    datasets: [
      {
        label: "Count",
        data: [productCount],
        backgroundColor: ["rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
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
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
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
      <button onClick={refreshButtonHandler}>Refresh</button>
      {/* Products by Category Graph */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Products by Category</h3>
        <div style={{ height: "200px", width: "100%" }}>
          <Bar data={categoryData} options={options} />
        </div>
      </div>

      {/* Users Graph */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">User Count</h3>
        <div style={{ height: "200px", width: "100%" }}>
          <Bar data={userData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
