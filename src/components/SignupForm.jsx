import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://trainbooking-backend-yaa3.onrender.com/api/auth/signup",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      console.log("Login successful", response.data);
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/seatbooking"); // Redirect to dashboard or homepage
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Invalid credentials, please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Signup</h1>
        </div>

        <form onSubmit={signupHandle} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
            >
              Signup
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
