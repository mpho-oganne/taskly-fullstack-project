import React from 'react';
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  return (
    <nav className="bg-gray-800 h-screen w-64 p-6 flex flex-col items-center">
      {/* Profile Section */}
      <div className="mb-4 flex flex-col items-center text-center">
      <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
        <h2 className="text-white text-lg">Name Surname</h2>
        <p className="text-gray-400 text-sm">email.address@example.com</p>
      </div>

      {/* Navbar Links */}
      <ul className="text-white space-y-4 w-full"> {/* Reduced space-y-6 to space-y-4 */}
        <li className="w-full">
          <a href="#dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-home text-xl"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#task-list" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-tasks text-xl"></i>
            <span>Tasks</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#calendar" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-calendar-alt text-xl"></i>
            <span>Calendar</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#notifications" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-bell text-xl"></i>
            <span>Notifications</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#reports" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-chart-line text-xl"></i>
            <span>Reports</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-user text-xl"></i>
            <Link to="/profile">Profile</Link>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;