// AdminSettings.js
import React, { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext"; // Import useTheme

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { darkMode, toggleDarkMode } = useTheme(); // Access darkMode and toggleDarkMode

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className="bg-white shadow p-5">
        <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>
        <p className="text-gray-600">
          Manage application settings and preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-5 space-x-5">
        <button
          className={`py-2 px-6 rounded-lg ${activeTab === "general" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`py-2 px-6 rounded-lg ${activeTab === "security" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8 mx-auto max-w-4xl bg-white shadow rounded-lg p-6">
        {activeTab === "general" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
            <p className="text-gray-600 mt-2">
              Modify basic settings like appearance and preferences.
            </p>

            {/* Toggle Dark Mode */}
            <div className="flex items-center justify-between mt-5">
              <span className="text-gray-700">Enable Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${darkMode ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform ${darkMode ? "translate-x-6" : ""}`}
                ></div>
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
            <p className="text-gray-600 mt-2">
              Manage password and account security options.
            </p>

            {/* Change Password */}
            <div className="mt-5">
              <label className="block text-gray-700 font-medium">Change Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
