import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageModal from "../../MessageModal";

// Mock API Call or Import Your API Service
const fetchAllNonDeletedAndActiveUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const getAllUsersResponse = await axios.get(
    `https://localhost:44378/admin/get-all-nondeleted-active-users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const fetchedUsers = getAllUsersResponse.data.value;
  // console.log(getAllUsersResponse.data.value);

  return fetchedUsers;
};

const fetchAllDeletedAndInactiveUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const getAllUsersResponse = await axios.get(
    `https://localhost:44378/admin/get-all-deleted-nonactive-users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const fetchedUsers = getAllUsersResponse.data.value;
  // console.log(getAllUsersResponse.data.value);

  return fetchedUsers;
};

// Mock API functions
const deleteUser = async (userId) => {
  try {
    // console.log(userId);

    const accessToken = localStorage.getItem("accessToken");
    const deleteAPIResponse = await axios.post(
      `https://localhost:44378/admin/delete-user`,
      null, // No body needed, so send `null`.
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userId }, // Pass `userId` as a query parameter
      }
    );
    // console.log(
    //   "User deleted: " +
    //     deleteAPIResponse.data.value.firstName +
    //     " " +
    //     deleteAPIResponse.data.value.lastName
    // );

    if (deleteAPIResponse.data.isSuccessfull) {
    } else {
      console.log(deleteAPIResponse.data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
};

const activateDeletedUser = async (userId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Make the API request using the DELETE method like in activateDeletedProduct
    const activateAPIResponse = await axios.delete(
      `https://localhost:44378/admin/activate-deleted-user?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Authorization header
        },
      }
    );

    // Check the response status and log messages
    if (activateAPIResponse.data.isSuccessfull) {
      // console.log(
      //   "User activated successfully: " +
      //     activateAPIResponse.data.value.firstName +
      //     " " +
      //     activateAPIResponse.data.value.lastName
      // );
    } else {
      console.log(
        "Error activating user:",
        activateAPIResponse.data.errorMessage
      );
    }
  } catch (error) {
    console.error("Error in activating user:", error);
  }
};

const updateUserAPICall = async (userId, updatedUser) => {
  try {
    console.log(`User with ID ${userId} updated`, updatedUser);

    const accessToken = localStorage.getItem("accessToken");
    const updateUserAPIResponse = await axios.put(
      `https://localhost:44378/admin/`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(updateUserAPIResponse.data);
    return updateUserAPIResponse.data.isSuccessfull;
  } catch (error) {
    console.log(error.errorMessage);
    return false;
  }
};

const addUser = async (newUser) => {
  try {
    console.log(`User adding`, newUser);

    const accessToken = localStorage.getItem("accessToken");
    const newUserAPIResponse = await axios.post(
      `https://localhost:44378/admin/`,
      newUser,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(newUserAPIResponse.data);
    return newUserAPIResponse.data.isSuccessfull;
  } catch (error) {
    console.log(error.errorMessage);
    return false;
  }
};

const AdminUserList = () => {
  const [nonDeletedAndActiveUsers, setNonDeletedAndActiveUsers] = useState([]);
  const [deletedAndNonActiveUsers, setDeletedAndNonActiveUsers] = useState([]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [updateUser, setUpdateUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const nonDeletedAndActiveAllUsersResponse =
        await fetchAllNonDeletedAndActiveUsers();

      const deletedAndNonActiveAllUsersResponse =
        await fetchAllDeletedAndInactiveUsers();

      const nonAdminNonDeletedAndActiveUsers =
        nonDeletedAndActiveAllUsersResponse.filter(
          (user) => user.role != "ADMIN"
        );
      // console.log(nonDeletedAndActiveAllUsersResponse);
      setNonDeletedAndActiveUsers(nonAdminNonDeletedAndActiveUsers);

      setDeletedAndNonActiveUsers(deletedAndNonActiveAllUsersResponse);
    };
    getUsers();
    setMessage("");
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      // Make an API call to delete the user
      await deleteUser(userId);

      // Remove the deleted user from the nonDeletedAndActiveUsers state
      setNonDeletedAndActiveUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      // Optionally, you can add the deleted user to the deletedAndNonActiveUsers state immediately after deletion
      const userToDelete = nonDeletedAndActiveUsers.find(
        (user) => user.id === userId
      );
      setDeletedAndNonActiveUsers((prevUsers) => [...prevUsers, userToDelete]);

      setMessage("User deleted successfully: " + userToDelete);
      setShowModal(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
      setShowModal(true);
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      // Make an API call to activate the deleted user
      await activateDeletedUser(userId);

      // Remove the activated user from the deletedAndNonActiveUsers state
      setDeletedAndNonActiveUsers((prevUsers) => {
        // Ensure prevUsers is always an array
        if (!Array.isArray(prevUsers)) return [];
        return prevUsers.filter((user) => user.id !== userId);
      });

      // Fetch the user from the previous state before activation
      const userToActivate = deletedAndNonActiveUsers.find(
        (user) => user.id === userId
      );

      // Add the activated user to the nonDeletedAndActiveUsers state
      if (userToActivate) {
        setNonDeletedAndActiveUsers((prevUsers) => {
          // Ensure prevUsers is always an array
          if (!Array.isArray(prevUsers)) return [];
          return [...prevUsers, userToActivate];
        });
      }

      console.log(userToActivate);

      setMessage(
        userToActivate
          ? `User activated successfully: ${
              userToActivate.firstName + " " + userToActivate.lastName
            }`
          : "User activated successfully."
      );
      setShowModal(true);
    } catch (error) {
      console.error("Error activating user:", error);
      setMessage("Error activating user.");
      setShowModal(true);
    }
  };

  const handleUpdateButtonClick = async (updateUser) => {
    console.log("update user form.");
    const toBeUpdatedUser = {
      id: updateUser.id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      username: updateUser.userName,
      email: updateUser.email,
      phone: updateUser.phone,
      role: updateUser.role,
      password: "",
      confirmPassword: "",
    };
    setUpdateUser(toBeUpdatedUser);
    console.log(toBeUpdatedUser);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log(updateUser);
    const updateIsSuccessfull = await updateUserAPICall(
      updateUser.id,
      updateUser
    );

    if (updateIsSuccessfull) {
      setMessage("User Updated successfully.");
      setIsUpdating(false);
    } else {
      setMessage(`error while updating User.`);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Find the next available ID
    const nextId =
      nonDeletedAndActiveUsers.length > 0
        ? Math.max(...nonDeletedAndActiveUsers.map((user) => user.id)) + 1
        : 1;

    // Create new user object with the next available ID
    const addedUser = {
      id: nextId,
      ...newUser,
    };

    const newUserAddingSuccessfull = await addUser(addedUser);
    if (newUserAddingSuccessfull) {
      setNonDeletedAndActiveUsers([...nonDeletedAndActiveUsers, addedUser]);
      setNewUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
      }); // Reset the form
      setIsAddingUser(false); // Hide the form after adding
      setMessage("New user added.");
      setIsAddingUser(false);
    } else {
      setMessage("error while adding user.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Non-Admin Active Users</h2>
      {/* <h2 className="text-xl font-semibold mb-4">{message}</h2> */}
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
          <h3 className="text-lg font-semibold mb-2">{message}</h3>
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
              type="tel"
              placeholder="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
      {isUpdating && (
        <form
          onSubmit={handleUpdateUser}
          className="mb-6 p-4 border rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Update User Form</h3>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={updateUser.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={updateUser.lastName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, lastName: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Username"
              value={updateUser.username}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, username: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={updateUser.phone}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, phone: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="tel"
              placeholder="role"
              value={updateUser.role}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, role: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={updateUser.password}
              onChange={(e) => {
                if (e.target.value !== null) {
                  return setUpdateUser({
                    ...updateUser,
                    password: e.target.value,
                  });
                } else {
                  return setUpdateUser({ ...updateUser, password: "" });
                }
              }}
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={updateUser.confirmPassword}
              onChange={(e) => {
                if (e.target.value !== null) {
                  return setUpdateUser({
                    ...updateUser,
                    confirmPassword: e.target.value,
                  });
                } else {
                  return setUpdateUser({ ...updateUser, confirmPassword: "" });
                }
              }}
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update User
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

      {nonDeletedAndActiveUsers &&
      Array.isArray(nonDeletedAndActiveUsers) &&
      nonDeletedAndActiveUsers.length > 0 ? (
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
            {nonDeletedAndActiveUsers.map((user, index) => (
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
                    onClick={() => {
                      setIsUpdating(true);
                      handleUpdateButtonClick(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No non-admin found.</p>
      )}
      <h2 className="text-xl font-semibold mb-4">Non-Admin Deleted Users</h2>
      {deletedAndNonActiveUsers &&
      Array.isArray(deletedAndNonActiveUsers) &&
      deletedAndNonActiveUsers.length > 0 ? (
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
            {deletedAndNonActiveUsers.map((user, index) => (
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
                    className="text-green-600 hover:underline"
                    onClick={() => handleActivateUser(user.id)}
                  >
                    Activate User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">
          No non-admin nonDeletedAndActiveUsers found.
        </p>
      )}
      {/* Show modal if there's a message */}
      {showModal && (
        <MessageModal message={message} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default AdminUserList;
