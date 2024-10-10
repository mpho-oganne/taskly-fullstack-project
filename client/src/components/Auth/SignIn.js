import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous error messages

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signin",
        formData,
        { withCredentials: true }
      );

      if (response && response.data) {
        setMessage(response.data.message);
        console.log("User signed in successfully:", response.data.user);

        // Store user details in state
        setUser(response.data.user);

        // Mark user as authenticated
        setIsAuthenticated(true);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setMessage("Unexpected response format from the server.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error messages from the server
        const errorMessage = error.response.data.error;
        if (errorMessage === "Invalid login credentials") {
          setMessage("Incorrect email or password. Please try again.");
        } else {
          setMessage(errorMessage || "There was an issue signing in.");
        }
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      {/* Main container */}
      <div className="flex w-3/4 max-w-2xl shadow-lg rounded-lg overflow-hidden">
        {/* Left side - Login form */}
        <div className="w-2/3 bg-white p-10">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold rounded-lg hover:bg-gradient-to-l transition duration-300"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password Link - Positioned directly below and to the right of the login button */}
          <div className="mt-4 text-right">
            <Link
              to="/forgot-password"
              className="py-2 px-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition duration-300"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Right side - Sign Up button in a subtler grey box */}
        <div className="w-1/3 bg-gray-200 flex items-center justify-center p-4">
          <div className="w-full text-center">
            <Link to="/signup">
              <button className="py-3 px-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
