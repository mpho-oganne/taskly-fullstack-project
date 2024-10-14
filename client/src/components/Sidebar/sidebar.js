import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import {
  LogOut,
  Home,
  User,
  Calendar,
  ChartLine,
  Trophy,
  Medal,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Sidebar({ user, signout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("audioPlayed");
    signout();
    navigate("/");
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      className: "bg-blue-600 text-white font-bold rounded-lg shadow-lg p-4",
      progressClassName: "bg-blue-500",
    });
  };

  return (
    <nav className="bg-gray-100 fixed h-full w-64 p-6 flex flex-col border-r border-gray-200">
      <div className="w-full flex flex-col items-center mb-8">
        <div className="flex items-center mb-4">
          {user?.profilePicture ? (
            <img
              src={`http://localhost:3001/uploads/${user.profilePicture}`}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm"
            />
          ) : (
            <Avatar name={user?.name} size={64} round={true} />
          )}
        </div>
        <span className="text-xl font-semibold text-gray-800">
          {user?.name}
        </span>
        <span className="text-sm text-gray-600">Dashboard</span>
      </div>

      <ul className="text-white space-y-4 w-full">
        <li className="w-full">
          <a
            href="#dashboard"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-home text-xl"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="w-full">
          <Link
            to="/tasks"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-user text-xl"></i>
            <span>Tasks</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="/calendar"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-calendar-alt text-xl"></i>
            <span>Calendar</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/report"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-chart-line text-xl"></i>
            <span>Reports</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/rewards"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-trophy text-xl"></i>
            <span>Tasks Rewards</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="/leaderboard"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-medal text-xl"></i>
            <span>Leaderboard</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="/profile"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
          >
            <i className="fas fa-user text-xl"></i>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
