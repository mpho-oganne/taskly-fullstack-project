import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match, try again");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold">
            <span className="text-gray-900">Create your </span>
            <span className="text-purple-600">account</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signin"
              className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
              <h3 className="text-2xl font-bold mb-6">
                Get Started with Taskly!
              </h3>
              <ul className="space-y-4">
                {[
                  "Manage tasks effortlessly with our intuitive interface.",
                  "Set task reminders to stay on track and hit deadlines.",
                  "Earn rewards for completing tasks ahead of schedule!",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  {
                    name: "name",
                    label: "Full name",
                    type: "text",
                    placeholder: "Enter your full name",
                  },
                  {
                    name: "email",
                    label: "Email address",
                    type: "email",
                    placeholder: "Enter your email address",
                  },
                  {
                    name: "password",
                    label: "Password",
                    type: "password",
                    placeholder: "Create new password",
                  },
                  {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    type: "password",
                    placeholder: "Confirm your password",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      value={formData[field.name]}
                    />
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Get updates and notifications about our product
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {message && (
                <div className="mt-4 text-sm text-red-600" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
