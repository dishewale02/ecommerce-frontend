// src/components/AccountDetailsPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountDetails from "./AccountDetails";
import EditAccountDetails from "./EditAccountDetails";

export const AccountDetailsPage = () => {
  const { setUser, User } = useAuth();
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setMessage(""); // Clear message when toggling edit mode
  };

  const handleEditAccountDetails = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Prepare updated user data
    const updatedUser = {
      id: User.id,
      userName: User.userName,
      firstName: User.firstName,
      lastName: User.lastName,
      email: User.email,
      phone: User.phone,
    };

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    try {
      const response = await axios.post(
        "https://localhost:44378/auth/update-user",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the token to the Authorization header
          },
        }
      );

      // Log the full response for inspection
      console.log("API Response:", response);

      if (response.data.isSuccessfull) {
        console.log(response.data.value);

        setUser(response.data.value); // Update user in context with new data
        setMessage("Account details updated successfully!"); // Success message
        setIsEditing(false); // Exit edit mode
      } else {
        console.log(response.data.errorMessage);
        setMessage(response.data.errorMessage); // Error message
      }
    } catch (error) {
      setMessage("An error occurred while updating your account."); // Catch error
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">Your Account Details</h2>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      {!isEditing ? (
        <AccountDetails user={User} onEdit={toggleEditMode} />
      ) : (
        <EditAccountDetails
          user={User}
          onUpdate={handleEditAccountDetails}
          onCancel={toggleEditMode}
          onChange={(updatedData) => setUser(updatedData)}
          message={message} // Pass message to EditAccountDetails
        />
      )}
    </div>
  );
};

export default AccountDetailsPage;
