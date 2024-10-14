import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Sparkle = ({ style }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [1, 1, 0],
    }}
    transition={{ duration: 0.8 }}
    style={{
      position: "absolute",
      width: "10px",
      height: "10px",
      backgroundColor: "#FFD700",
      borderRadius: "50%",
      ...style,
    }}
  />
);

export default function CreateTaskForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priorityLevel: "medium",
    status: "pending",
  });

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const response = await axios.get("http://localhost:3001/user/suggest", {
        withCredentials: true,
      });
      setSuggestions(response.data.suggestedTasks);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createSparkles = () => {
    const newSparkles = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        },
      });
    }
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setSuccess(true);
      createSparkles();
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priorityLevel: "medium",
        status: "pending",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestion,
    }));
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} style={sparkle.style} />
        ))}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Create New Task
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6 h-[600px]">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                  </div>
                )}
                {success && (
                  <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">
                      {" "}
                      Task created successfully!
                    </span>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                    className="w-full rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500 px-4 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows={4}
                    className="w-full rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500 px-4 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Due Date
                    </label>
                    <div className="relative">
                      <input
                        id="dueDate"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500 pl-10 pr-4 py-2"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="priorityLevel"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Priority Level
                    </label>
                    <div className="relative">
                      <select
                        id="priorityLevel"
                        name="priorityLevel"
                        value={formData.priorityLevel}
                        onChange={handleChange}
                        className="w-full rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500 pl-10 pr-4 py-2 appearance-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500 pl-10 pr-4 py-2 appearance-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  )}
                  {loading ? "Creating Task..." : "Create Task"}
                </button>
              </form>
            </div>
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-purple-600">
                AI Task Suggestions
              </h3>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 flex-grow overflow-hidden flex flex-col">
                <button
                  onClick={fetchSuggestions}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg flex items-center justify-center mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Get AI Suggestions
                </button>
                {loadingSuggestions ? (
                  <div className="flex justify-center items-center h-48">
                    <svg
                      className="animate-spin h-8 w-8 text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <ul className="space-y-2 flex-grow overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <button
                          onClick={() => applySuggestion(suggestion)}
                          className="w-full text-left text-purple-700 hover:text-purple-900"
                        >
                          {suggestion}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
