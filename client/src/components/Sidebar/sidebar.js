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
      <ul className="space-y-2 w-full">
        {[
          { icon: Home, label: "Dashboard", path: "/dashboard" },
          { icon: User, label: "Task List", path: "/tasks" },
          { icon: Calendar, label: "Calendar", path: "/calendar" },
          { icon: ChartLine, label: "Reports", path: "/reports" },
          { icon: Trophy, label: "Task Rewards", path: "/rewards" },
          { icon: Medal, label: "Leaderboard", path: "/leaderboard" },
        ].map(({ icon: Icon, label, path }) => (
          <li key={path} className="w-full">
            <Link
              to={path}
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-200 text-gray-700"
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
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
