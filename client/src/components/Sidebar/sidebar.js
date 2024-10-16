import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Sidebar({ signout }) {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          withCredentials: true,
        });
        setUser(response.data.user); 
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
    <nav className="bg-gray-50 fixed h-full w-64 p-6 flex flex-col border-r border-gray-200 overflow-y-auto">
      <div className="w-full flex flex-col items-center mb-8">
        <div className="flex items-center mb-4">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture} 
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm"
            />
          ) : (
            <Avatar name={user?.name} size={64} round={true} />
          )}
        </div>
        <span className="text-xl font-semibold text-gray-800">
          {user?.name || "Loading..."}
        </span>
        <span className="text-sm text-gray-600">Dashboard</span>
      </div>

      <ul className="text-gray-700 space-y-4 w-full">
        <li className="w-full">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
          >
            <i className="fas fa-home text-xl"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/dashboard/tasks"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
          >
            <i className="fas fa-tasks text-xl"></i>
            <span>Tasks</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/dashboard/report"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
          >
            <i className="fas fa-chart-line text-xl"></i>
            <span>Reports</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/dashboard/rewards"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
          >
            <i className="fas fa-trophy text-xl"></i>
            <span>Task Rewards</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/dashboard/leaderboard"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
          >
            <i className="fas fa-medal text-xl"></i>
            <span>Leaderboard</span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            to="/dashboard/profile"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md"
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
