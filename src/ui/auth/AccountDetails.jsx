import React from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = ({ user, onEdit }) => {
  const navigate = useNavigate();

  const onClickHandle = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">User Name</h3>
        <p className="mt-2 text-gray-700">{user.userName}</p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Full Name</h3>
        <p className="mt-2 text-gray-700">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Email Address</h3>
        <p className="mt-2 text-gray-700">{user.email}</p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Phone Number</h3>
        <p className="mt-2 text-gray-700">{user.phone}</p>
      </div>

      {/* Additional Details */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
        <p className="mt-2 text-gray-700">Address not saved yet.</p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
        <p className="mt-2 text-gray-700">NA</p>
      </div>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={onEdit}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={onClickHandle}
          className="rounded-md bg-yellow-500 px-4 py-2 text-black text-sm font-medium hover:bg-yellow-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
