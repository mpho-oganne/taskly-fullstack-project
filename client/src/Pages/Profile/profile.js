import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaUser, FaCamera, FaSpinner } from 'react-icons/fa'
import { MdEmail, MdLock, MdRefresh, MdEdit, MdInfo } from 'react-icons/md'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null,
  })
  const [message, setMessage] = useState({ type: '', content: '' })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user', {
        withCredentials: true,
      })
      const userData = response.data.user
      setUser(userData)
      setUpdatedUser({
        name: userData.name,
        email: userData.email,
        password: '',
        profilePicture: null,
      })
    } catch (error) {
      showMessage('Error', 'Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedUser({
        ...updatedUser,
        profilePicture: e.target.files[0],
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)

    const formData = new FormData()
    formData.append('name', updatedUser.name)
    formData.append('email', updatedUser.email)
    if (updatedUser.password) {
      formData.append('password', updatedUser.password)
    }
    if (updatedUser.profilePicture) {
      formData.append('profilePicture', updatedUser.profilePicture)
    }

    try {
      const response = await axios.put(
        'http://localhost:3001/user/update',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setUser(response.data.user)
      showMessage('Success', 'Profile updated successfully')
    } catch (error) {
      showMessage('Error', 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleRemoveProfilePicture = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3001/user/remove-profile-picture',
        null,
        {
          withCredentials: true,
        }
      )
      setUser(response.data.user)
      setUpdatedUser({
        ...updatedUser,
        profilePicture: null,
      })
      showMessage('Success', 'Profile picture removed successfully')
    } catch (error) {
      showMessage('Error', 'Failed to remove profile picture')
    }
  }

  const showMessage = (type, content) => {
    setMessage({ type, content })
    setTimeout(() => setMessage({ type: '', content: '' }), 3000)
  }

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
      <p className="text-gray-600 mb-6 text-center">Manage your account settings and preferences.</p>

      {message.content && (
        <div className={`mb-4 p-2 rounded ${message.type === 'Error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.content}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg`}
            onClick={() => setActiveTab('info')}
          >
            <MdInfo className="inline-block mr-2" />
            Information
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg`}
            onClick={() => setActiveTab('edit')}
          >
            <MdEdit className="inline-block mr-2" />
            Edit Profile
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              {user?.profilePicture ? (
                <img
                  src={`http://localhost:3001/uploads/${user.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-4xl" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        )}

        {activeTab === 'edit' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={updatedUser.name}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <MdEmail className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <MdLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('profilePicture').click()}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <FaCamera className="inline-block mr-2" />
                  Choose File
                </button>
                {user?.profilePicture && (
                  <button
                    type="button"
                    onClick={handleRemoveProfilePicture}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove Picture
                  </button>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={updating}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {updating ? (
                <>
                  <FaSpinner className="inline-block mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <button
          onClick={fetchUserData}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <MdRefresh className="mr-1" />
          Refresh
        </button>
      </div>
    </div>
  )
}