import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Taskly</h3>
            <p className="text-sm text-gray-400">Your AI-powered productivity companion</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition duration-200">AI Assistant</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-200">Task Management</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-200">Customization</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition duration-200">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition duration-200">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-200">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition duration-200">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taskly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}