import React, { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Import social media icons

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(false);
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setShowPopup(false), 3000);
  };

  // Validate email format
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 items-center justify-center overflow-hidden">
  <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 bg-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Please fill out this form.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">
                    Sandton, Johannesburg, South Africa
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">+27 81 846 7746</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">
                    nextgencoder10@gmail.com
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {/* Social media links */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaFacebookF className="w-5 h-5 text-purple-600" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaInstagram className="w-5 h-5 text-purple-600" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaLinkedinIn className="w-5 h-5 text-purple-600" />
                </a>
              </div>
            </div>
          </div>
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`block w-full px-4 py-3 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                    emailError ? "border-red-300" : "border-gray-300"
                  }`}
                  required
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Thank You!
              </h3>
              <p className="text-gray-700">
                We've received your message and will be in touch soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
