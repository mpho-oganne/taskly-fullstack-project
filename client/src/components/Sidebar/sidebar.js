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
  const [isModalOpen, setModalOpen] = useState(false); // State for logout modal

  // Function to handle logout
  const handleLogout = () => {
    signout(); // Call the signout function

    // Navigate to the home page first
    navigate("/");

    // Then show a toast notification after redirecting to home
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      className: "bg-purple-600 text-white font-bold rounded-lg shadow-lg p-4", // Tailwind classes for toast
      progressClassName: "bg-pink-500", // Tailwind classes for progress bar
    });

    setModalOpen(false); // Close the modal immediately
  };

  return (
    <>
      <nav className="bg-gray-800 h-screen w-64 p-6 flex flex-col items-center">
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
              <h2 className="text-white text-lg">
                {user?.name} {user?.surname}
              </h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
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
            <a
              href="#task-list"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
            >
              <i className="fas fa-tasks text-xl"></i>
              <span>Tasks</span>
            </a>
          </li>
          <li className="w-full">
            <a
              href="#calendar"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
            >
              <i className="fas fa-calendar-alt text-xl"></i>
              <span>Calendar</span>
            </a>
          </li>
          <li className="w-full">
            <a
              href="#reports"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md"
            >
              <i className="fas fa-chart-line text-xl"></i>
              <span>Reports</span>
            </a>
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
          <li className="w-full">
            {/* Logout Option */}
            <button
              onClick={() => setModalOpen(true)} // Open the modal when logout is clicked
              className="w-full flex items-center space-x-2 p-2 hover:bg-red-600 rounded-md text-left"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Modal for Logout Confirmation */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleLogout} // Log out the user when confirmed
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Yes, log out
                </button>
                <button
                  onClick={() => setModalOpen(false)} // Close the modal if canceled
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Sidebar;
