import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://trainbooking-backend-yaa3.onrender.com/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // storing the token in local storage for logout use
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/seatbooking"); // redirecting to dashboard 

    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Invalid credentials, please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Welcome Back!</h1>
          <p className="text-gray-500">Login to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={loginHandle} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;