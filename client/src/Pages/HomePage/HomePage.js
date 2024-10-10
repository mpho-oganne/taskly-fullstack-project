import React from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiLayout, FiSettings } from "react-icons/fi";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4 overflow-hidden">
        {/* Background Shape */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Taskly
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl animate-fade-in-up">
          Your all-in-one tool to stay organized, achieve more, and unlock your
          full potential.
          <br />
          Ready to take control of your tasks? Start now!
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="relative text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-110"
        >
          Get Started Now
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-purple-500 underline cursor-pointer"
          >
            Sign in
          </span>
        </p>

        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      </section>

      {/* About Taskly Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">About Taskly</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Taskly is your intelligent companion in the world of personal task
              management. We've combined cutting-edge AI technology with
              intuitive design to create a platform that not only organizes your
              tasks but actively helps you accomplish them.
            </p>
            <p className="text-gray-600">
              Whether you're a busy professional juggling multiple projects, a
              student balancing coursework and extracurriculars, or anyone
              looking to bring order to their daily life, Taskly adapts to your
              unique needs and work style. Our AI-powered features, including
              task suggestions and upcoming chatbot support, are designed to
              make your task management experience smoother and more efficient
              than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Taskly Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Taskly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-6 text-center">
              <FiClock className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">
                Manage Time Efficiently
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Keep track of all your tasks and manage your time effectively
                with Taskly’s productivity tools.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-6 text-center">
              <FiLayout className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">
                Multiple Views
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Switch between list, board, and calendar views to organize your
                tasks in a way that fits your style.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-6 text-center">
              <FiSettings className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">
                Customizable Workflow
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Customize fields and layouts to personalize your task management
                and boost productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-powered productivity */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  AI-Powered Assistance
                </h3>
                <p className="mb-6">
                  Taskly's AI integration helps you stay on top of your tasks by
                  suggesting tasks and reading them out loud, keeping you
                  organized and efficient.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    AI-powered task suggestions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Text-to-Speech for reading tasks out loud
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Upcoming AI chatbot
                  </li>
                </ul>
                <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition duration-300">
                  Summarize
                </button>
              </div>
            </div>

            {/* Track Progress and Leaderboard */}
            <div className="bg-blue-500 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Track Progress & Compete
                </h3>
                <p className="mb-6">
                  Monitor your tasks, track your working hours, and compete with
                  others on the leaderboard as you complete tasks and achieve
                  more.
                </p>
                <div className="bg-white text-gray-800 p-4 rounded-md">
                  <div className="flex space-x-4 mb-4">
                    <span className="font-medium text-blue-500 border-b-2 border-blue-500 pb-1">
                      Task List
                    </span>
                    <span className="font-medium">Board View</span>
                    <span className="font-medium">Calendar View</span>
                    <span className="font-medium text-blue-500">
                      + Add View
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>Track daily tasks and progress</span>
                      </div>
                      <span className="text-blue-500">To Do</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Analyze productivity and insights</span>
                      </div>
                      <span className="text-green-500">In Progress</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>Work on advanced project management</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earn Rewards & Full Reports */}
            <div className="bg-indigo-600 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Earn Rewards & Get Reports
                </h3>
                <p className="mb-6">
                  Earn rewards for task completion, and receive full reports
                  with insightful graphics on your productivity and performance.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FiClock className="mr-2" /> Time Tracking
                    </span>
                    <div className="w-12 h-6 bg-indigo-400 rounded-full p-1 duration-300 ease-in-out">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6 duration-300 ease-in-out"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FiLayout className="mr-2" /> Sprints
                    </span>
                    <div className="w-12 h-6 bg-indigo-400 rounded-full p-1 duration-300 ease-in-out">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6 duration-300 ease-in-out"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FiSettings className="mr-2" /> Custom Fields
                    </span>
                    <div className="w-12 h-6 bg-indigo-400 rounded-full p-1 duration-300 ease-in-out">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
