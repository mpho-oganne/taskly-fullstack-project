import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const { user, signout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false); 

  // Function to handle logout
  const handleLogout = () => {
    signout(); 
    navigate("/"); 
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      className: "bg-purple-600 text-white font-bold rounded-lg shadow-lg p-4",
      progressClassName: "bg-pink-500",
    });
    setModalOpen(false); 
  };

  return (
    <nav className="bg-gray-800 fixed h-full w-64 p-6 flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center text-center">
        <div className="flex items-center mb-2">
          {user?.profilePicture ? (
            <img
              src={`http://localhost:3001/uploads/${user.profilePicture}`}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2"
            />
          ) : (
            <Avatar name={user?.name} size={40} round={true} />
          )}
          <div>
            <h2 className="text-white text-lg">{user?.name} {user?.surname}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      <ul className="text-white space-y-4 w-full">
        <li className="w-full">
          <a href="#dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-home text-xl"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="w-full">
          <Link to="/new-task" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-tasks text-xl"></i>
            <span>Tasks</span>
          </Link>
        </li>
        <li className="w-full">
          <a href="#calendar" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-calendar-alt text-xl"></i>
            <span>Calendar</span>
          </a>
        </li>
        <li className="w-full">
          <a href="#reports" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-chart-line text-xl"></i>
            <span>Reports</span>
          </a>
        </li>
        <li className="w-full">
          <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <i className="fas fa-user text-xl"></i>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;