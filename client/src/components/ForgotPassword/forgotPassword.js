import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend /user/forgot-password route on port 3001
      const response = await axios.post(
        "http://localhost:3001/user/forgot-password",
        { email }
      );
      setMessage(response.data.message); // Display success message
      setError(""); // Clear any previous errors
    } catch (err) {
      // Handle errors
      setError(err.response ? err.response.data.message : "Server error");
      setMessage(""); // Clear any previous messages
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      {/* Form container */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative z-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email to reset your password:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 p-2 text-center text-green-700 bg-green-100 rounded-lg">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 p-2 text-center text-red-700 bg-red-100 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
