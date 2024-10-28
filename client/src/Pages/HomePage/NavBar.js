import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ZA, GB } from "country-flag-icons/react/3x2"; // Import the flags
import { FiMenu, FiX } from "react-icons/fi"; // Import menu and close icons

export default function NavBar() {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  // Function to change the language and close the dropdown
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const currentLang = i18n.language; // Get the current language

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Taskly brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          <Link to="/" className="text-xl font-bold text-gray-800">
            Taskly
          </Link>
        </div>

        {/* Hamburger icon for mobile menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav links for larger screens */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
          >
            Contact Us
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              to="/signin"
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md focus:outline-none transition-colors duration-200 border border-blue-700" // Blue initial design
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {/* Display current language flag and name */}
              {currentLang === "zu" ? (
                <ZA className="w-5 h-5" title="Zulu" />
              ) : (
                <GB className="w-5 h-5" title="English" />
              )}
              <span className="text-sm font-medium">
                {currentLang === "zu" ? "ZU" : "EN"}
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-300">
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-md">
          <div className="flex flex-col items-start py-4 px-6 space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/signin"
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
