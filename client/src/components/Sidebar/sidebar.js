import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const { user, signout } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('audioPlayed');
    signout();
    navigate("/");
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      className: "bg-purple-600 text-white font-bold rounded-lg shadow-lg p-4",
      progressClassName: "bg-pink-500",
    });
  };

  return (
    <nav className="bg-gray-800 fixed h-full w-64 p-6 flex flex-col">
      <div className="w-full flex flex-col items-center mb-8">
        <div className="flex items-center mb-2">
          {user?.profilePicture ? (
            <img
              src={`http://localhost:3001/uploads/${user.profilePicture}`}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <Avatar name={user?.name} size={40} round={true} />
          )}
        </div>
        <span className="text-white text-lg">{user?.name}</span>
      </div>

      <ul className="text-white space-y-4 w-full">
        <li className="w-full">
          <a href="#dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-home text-xl"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="w-full">
          <Link to="/tasks" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-user text-xl"></i>
            <span>Tasks</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="/calendar"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-calendar-alt text-xl"></i>
            <span>Calendar</span>
          </Link>
        </li>
        <li className="w-full">
          <a href="#reports" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-chart-line text-xl"></i>
            <span>Reports</span>
          </a>
        </li>
        <li className="w-full">
          <Link to="/rewards" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-trophy text-xl"></i>
            <span>Tasks Rewards</span>
          </Link>
        </li>
        <li className="w-full">
          <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-user text-xl"></i>
            <span>Profile</span>
          </Link>
        </li>
      </ul>

      {/* Signout section */}
      <div className="mt-auto flex justify-center">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
          <i className="fas fa-sign-out-alt text-xl"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;