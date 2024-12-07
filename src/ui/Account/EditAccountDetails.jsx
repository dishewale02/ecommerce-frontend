// src/components/EditAccountDetails.jsx
import React, { useState } from "react";

const EditAccountDetails = ({
  user,
  onUpdate,
  onCancel,
  onChange,
  message,
}) => {
  return (
    <form onSubmit={onUpdate}>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">User Name</h3>
        <input
          type="text"
          value={user.userName}
          readOnly
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Full Name</h3>
        <input
          type="text"
          value={`${user.firstName} ${user.lastName}`}
          onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(" ");
            onChange({ ...user, firstName, lastName });
          }}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Email Address</h3>
        <input
          type="email"
          value={user.email}
          onChange={(e) => onChange({ ...user, email: e.target.value })}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Phone Number</h3>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => onChange({ ...user, phone: e.target.value })}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>
      Display Message
      {message && <p className="mt-4 text-red-600">{message}</p>}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-500"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditAccountDetails;
