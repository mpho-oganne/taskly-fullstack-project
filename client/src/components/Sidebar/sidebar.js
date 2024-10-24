import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import {
  Home,
  ClipboardList,
  ChartLine,
  Trophy,
  Medal,
  User,
  LogOut,
} from "lucide-react";

// Modal Component is defined inline
function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Sign Out
        </h2>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={onConfirm}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ user, signout }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

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
    <>
      <nav className="bg-gray-50 fixed h-full w-64 p-6 flex flex-col border-r border-gray-200 overflow-y-auto shadow-lg">
        {/* Profile Section */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="flex items-center justify-center mb-4">
            {user?.profilePicture ? (
              <img
                src={`http://localhost:3001/uploads/${user.profilePicture}`}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md"
              />
            ) : (
              <Avatar name={user?.name} size={64} round={true} />
            )}
          </div>
          <span className="text-xl font-semibold text-gray-800">
            {user?.name}
          </span>
          <span className="text-sm text-gray-500">Dashboard</span>
        </div>

        {/* Navigation Links */}
        <ul className="text-gray-700 space-y-4 w-full">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Home className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/tasks"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ClipboardList className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Tasks</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/report"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChartLine className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Reports</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/taskRewards"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Trophy className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Task Rewards</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/leaderboard"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Medal className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Leaderboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-3 p-2 text-lg hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <User className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors duration-200" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-auto pt-6">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            <LogOut className="w-6 h-6 text-white" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
