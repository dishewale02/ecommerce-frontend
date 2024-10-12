import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex justify-center items-center">Link is not valid</div>
    );
  }

  const checkTokenAsync = async () => {
    const response = await axios.post(
      "https://localhost:44378/auth/check-forgot-password-token",
      { token }
    );

    const responseData = response.data;
    if (responseData.value) {
      setShowForm(true);
    } else {
      setShowForm(false);
      setMessage(responseData.errorMessage);
    }
  };

  useEffect(() => {
    checkTokenAsync();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setMessage("Password is required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("Password and Confirm Password does not match");
      return;
    }

    const reqBody = {
      token,
      newPassword,
    };

    const response = await axios.post(
      "https://localhost:44378/auth/reset-password",
      reqBody
    );

    const data = response.data;

    if (data.value) {
      navigate("/sign-in");
      return;
    } else {
      setMessage(data.errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {message && <p>{message}</p>}
        {showForm && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-3"></div>
            <div className="w-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
            {/* Display the status message */}
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
