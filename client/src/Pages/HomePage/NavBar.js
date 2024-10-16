import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ZA, GB } from "country-flag-icons/react/3x2"; // Import the flags

export default function NavBar() {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const currentLang = i18n.language; // Get current language

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
        <Link to="/" className="text-xl font-bold text-gray-800">
          Taskly
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
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
        <Link
          to="/contact"
          className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
        >
          Contact Us
        </Link>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md focus:outline-none hover:from-teal-400 hover:to-blue-500 transition-colors duration-300 shadow-lg"
          >
            {/* Display current language flag and name */}
            {currentLang === "zu" ? (
              <ZA className="w-6 h-6" title="Zulu" />
            ) : (
              <GB className="w-6 h-6" title="English" />
            )}
            <span className="font-medium">
              {currentLang === "zu" ? "Zulu" : "English"}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <button
                onClick={() => changeLanguage("en")}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-150"
              >
                <GB className="w-5 h-5 mr-2" />
                <span>English</span>
              </button>
              <button
                onClick={() => changeLanguage("zu")}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition-all duration-150"
              >
                <ZA className="w-5 h-5 mr-2" />
                <span>Zulu</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
