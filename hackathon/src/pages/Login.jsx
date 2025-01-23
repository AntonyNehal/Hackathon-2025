import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (email === "" || password === "") {
      setError("Please fill in both fields");
    } else {
      dispatch(signInStart()); // Dispatch start of login process
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(signInSuccess(data.userData)); // Store user email in Redux
          navigate("/job"); // Redirect to job page
        } else {
          dispatch(signInFailure(data.message)); // Dispatch failure with error message
          setError(data.message);
        }
      } catch (error) {
        dispatch(signInFailure("Something went wrong. Please try again.")); // Dispatch error
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          DRDO Login
        </h2>
        {error && (
          <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </div>
        )}
        {reduxError && (
          <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
            {reduxError}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Create new account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
