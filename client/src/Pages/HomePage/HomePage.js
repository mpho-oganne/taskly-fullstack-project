import React from 'react'
import { FiClock, FiLayout, FiSettings } from 'react-icons/fi'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your personal
          <br />
          task manager
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Organize your life, boost your productivity,
          <br />
          and never miss a deadline again.
        </p>
        <button 
          className="text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Get Started. It's FREE →
        </button>
        <p className="mt-4 text-sm text-gray-500">Start organizing today.</p>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">About Taskly</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Taskly is your intelligent companion in the world of personal task management. 
              We've combined cutting-edge AI technology with intuitive design to create a platform 
              that not only organizes your tasks but actively helps you accomplish them.
            </p>
            <p className="text-gray-600">
              Whether you're a busy professional juggling multiple projects, a student balancing 
              coursework and extracurriculars, or anyone looking to bring order to their daily life, 
              Taskly adapts to your unique needs and work style. Our AI-powered features, including 
              task suggestions and upcoming chatbot support, are designed to make your task management 
              experience smoother and more efficient than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-powered productivity */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">AI-powered productivity</h3>
                <p className="mb-6">Get work done faster with the only AI-powered assistant tailored to your role.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    AI-powered task suggestions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Text-to-Speech for reading tasks out loud
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Upcoming AI chatbot feature
                  </li>
                </ul>
                <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition duration-300">
                  Summarize
                </button>
              </div>
            </div>

            {/* View work your way */}
            <div className="bg-blue-500 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">View work your way</h3>
                <p className="mb-6">Instantly switch between 15 views including list, board, gantt, and more.</p>
                <div className="bg-white text-gray-800 p-4 rounded-md">
                  <div className="flex space-x-4 mb-4">
                    <span className="font-medium text-blue-500 border-b-2 border-blue-500 pb-1">List</span>
                    <span className="font-medium">Board</span>
                    <span className="font-medium">Calendar</span>
                    <span className="font-medium text-blue-500">+ Add</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>Customer profiles for key market</span>
                      </div>
                      <span className="text-blue-500">To Do</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Product insight</span>
                      </div>
                      <span className="text-green-500">In Progress</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Product research hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customize in a click */}
            <div className="bg-indigo-600 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Customize in a click</h3>
                <p className="mb-6">Configuring Taskly for different types of work is as easy as flipping a switch.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><FiClock className="mr-2" /> Time Tracking</span>
                    <div className="w-12 h-6 bg-indigo-400 rounded-full p-1 duration-300 ease-in-out">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><FiLayout className="mr-2" /> Sprints</span>
                    <div className="w-12 h-6 bg-indigo-400 rounded-full p-1 duration-300 ease-in-out">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6 duration-300 ease-in-out"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><FiSettings className="mr-2" /> Custom Fields</span>
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

      {/* You can add more sections here as needed */}
    </div>
  )
}