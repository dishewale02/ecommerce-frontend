import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, AuthContext } from "../../contexts/AuthContext";

const INITIAL_VALUE_LOGIN = {
  userName: "",
  password: "",
};

const INITIAL_VALUE_RESPONSE = {
  value: {
    accessToken: "",
    refreshToken: "",
  },
  isSuccessfull: false,
  errorMessage: "",
  errorMessages: "",
};

const SignInForm = () => {
  const [logInData, setLogInData] = useState(INITIAL_VALUE_LOGIN);
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(INITIAL_VALUE_RESPONSE);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    await login(logInData);
    navigate("/");
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-3"></div>
          <div className="w-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username or Email
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                value={logInData.userName}
                onChange={(e) =>
                  setLogInData({
                    ...logInData,
                    userName: e.target.value,
                  })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  onClick={() => {
                    navigate(`/forgot-password`);
                  }}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                value={logInData.password}
                required
                onChange={(e) =>
                  setLogInData({ ...logInData, password: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
          <a>Forgot Password</a>
          {/* Display the status message */}
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
