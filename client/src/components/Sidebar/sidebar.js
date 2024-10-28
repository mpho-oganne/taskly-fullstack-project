"use client"

import React, { useState } from 'react'
import { Home, ClipboardList, ChartLine, Trophy, Medal, User, LogOut } from 'lucide-react'

const NavItem = ({ icon: Icon, label, href, isActive = false }) => (
  <li>
    <a
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
      <span className="font-medium">{label}</span>
    </a>
  </li>
)

const Avatar = ({ src, alt, fallback }) => (
  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
        {fallback}
      </div>
    )}
  </div>
)

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to sign out?</h2>
        <p className="mb-6">You will be redirected to the login page.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ user, signout }) {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleLogout = () => {
    signout()
    setModalOpen(false)
  }

  return (
    <nav className="bg-white fixed h-full w-64 p-6 flex flex-col border-r border-gray-200 overflow-y-auto shadow-lg">
      <div className="flex flex-col items-center mb-10">
        <Avatar
          src={user?.profilePicture ? `http://localhost:3001/uploads/${user.profilePicture}` : null}
          alt={user?.name}
          fallback={user?.name?.charAt(0)}
        />
        <h2 className="text-xl font-bold text-gray-800 mt-4">{user?.name}</h2>
        <span className="text-sm text-gray-500">Dashboard</span>
      </div>

      <ul className="space-y-2">
        <NavItem icon={Home} label="Dashboard" href="/dashboard" isActive />
        <NavItem icon={ClipboardList} label="Tasks" href="/dashboard/tasks" />
        <NavItem icon={ChartLine} label="Reports" href="/dashboard/report" />
        <NavItem icon={Trophy} label="Task Rewards" href="/dashboard/taskRewards" />
        <NavItem icon={Medal} label="Leaderboard" href="/dashboard/leaderboard" />
        <NavItem icon={User} label="Profile" href="/dashboard/profile" />
      </ul>

      <div className="mt-auto pt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  )
}
