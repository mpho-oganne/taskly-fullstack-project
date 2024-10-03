import React from 'react';
import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 text-center px-4">
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
      <Link 
        to="/signup" 
        className="text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Get Started. It's FREE →
      </Link>
      <p className="mt-4 text-sm text-gray-500">Start organizing today.</p>
    </div>
  )
}


