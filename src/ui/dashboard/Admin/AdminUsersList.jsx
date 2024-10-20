import axios from "axios";
import React, { useEffect, useState } from "react";

// Mock API Call or Import Your API Service
const fetchUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const getAllUsersResponse = await axios.get(
    `https://localhost:44378/admin/get-all-user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const fetchedUsers = getAllUsersResponse.data.value;
  //   console.log(getAllUsersResponse.data.value);

  return fetchedUsers;
};

// Mock API functions
const deleteUser = async (userId) => {
  console.log(`User with ID ${userId} deleted`);
};

const updateUser = async (userId, updatedUser) => {
  console.log(`User with ID ${userId} updated`, updatedUser);
};

const addUser = async (newUser) => {
  console.log("New user added", newUser);
  return newUser; // Return the new user object directly without generating an ID here
};

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      const nonAdminUsers = allUsers.filter((user) => user.role != "ADMIN");
      console.log(nonAdminUsers);
      setUsers(nonAdminUsers);
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleUpdate = async (userId) => {
    const updatedUser = { name: "Updated Name", email: "updated@example.com" };
    await updateUser(userId, updatedUser);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Find the next available ID
    const nextId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    // Create new user object with the next available ID
    const addedUser = {
      id: nextId,
      ...newUser,
    };

    await addUser(addedUser);
    setUsers([...users, addedUser]);
    setNewUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }); // Reset the form
    setIsAddingUser(false); // Hide the form after adding
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Non-Admin Users</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setIsAddingUser(true)}
      >
        Add User
      </button>

      {isAddingUser && (
        <form
          onSubmit={handleAddUser}
          className="mb-6 p-4 border rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">New User Form</h3>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={() => setIsAddingUser(false)}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </form>
      )}

      {users.length > 0 ? (
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
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {user.userName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  {user.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  <button
                    className="text-blue-600 hover:underline mr-4"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No non-admin users found.</p>
      )}
    </div>
  );
};

export default AdminUserList;
