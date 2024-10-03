import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
        <Link to="/" className="text-xl font-bold text-gray-800">Taskly</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link to="/signin" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
          Log in
        </Link>
        <Link to="/signup" className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
          Sign Up
        </Link>
      </nav>
    </header>
  )
}