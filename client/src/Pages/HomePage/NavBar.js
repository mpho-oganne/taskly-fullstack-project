import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar() {
  const { user, signout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    signout(); // Call the signout function
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      className: "bg-purple-600 text-white font-bold rounded-lg shadow-lg p-4", // Tailwind classes for toast
      progressClassName: "bg-pink-500", // Tailwind classes for progress bar
    });
    setModalOpen(false); // Close the modal
    navigate("/"); // Redirect to the home page after logging out
  };

  return (
    <>
      <ToastContainer /> {/* Required to show toasts */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          <Link to="/" className="text-xl font-bold text-gray-800">
            Taskly
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => setModalOpen(true)} // Open the modal only when the logout button is clicked
                className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Log out
              </button>

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
                        onClick={() => setModalOpen(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
