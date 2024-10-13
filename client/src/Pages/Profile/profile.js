import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          withCredentials: true,
        });
        const userData = response.data.user;

        setUser(userData);
        setUpdatedUser({
          name: userData.name,
          email: userData.email,
          password: "",
          profilePicture: userData.profilePicture,
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      profilePicture: e.target.files[0],
    });
  };

  const handleRemoveProfilePicture = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/user/remove-profile-picture",
        null,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      setUser(response.data.user);
      setUpdatedUser({
        name: user.name,
        email: user.email,
        password: "",
        profilePicture: null,
      });
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    formData.append("password", updatedUser.password);
    if (updatedUser.profilePicture) {
      formData.append("profilePicture", updatedUser.profilePicture);
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/user/update",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setUser(response.data.user);
      setIsEditing(false);
      setUpdatedUser({
        name: "",
        email: "",
        password: "",
        profilePicture: null,
      });
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleUpdateProfilePicture = async () => {
    const formData = new FormData();
    if (updatedUser.profilePicture) {
      formData.append("profilePicture", updatedUser.profilePicture);
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/user/update-profile-picture",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setUser(response.data.user);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <div className="mb-4">
        <img
          src={
            user?.profilePicture
              ? `http://localhost:3001/uploads/${user.profilePicture}`
              : "default-profile.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <p>
          <strong>Name:</strong> {user?.name || "Name not available"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "Email not available"}
        </p>
      </div>

      {!isEditing && (
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            setIsEditing(true);
            setUpdatedUser({
              name: user?.name || "",
              email: user?.email || "",
              password: "",
              profilePicture: user?.profilePicture || null,
            });
          }}
        >
          Update Details
        </button>
      )}

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-lg mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-lg mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new password if you want to change it"
            />
          </div>

          <div>
            <label className="block text-lg mb-1">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {updatedUser.profilePicture && (
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-2"
                onClick={handleRemoveProfilePicture}
              >
                Remove Profile Picture
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 ml-2"
            onClick={() => {
              setIsEditing(false);
              setUpdatedUser({
                name: user.name,
                email: user.email,
                password: "",
                profilePicture: user.profilePicture,
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
        onClick={handleUpdateProfilePicture}
      >
        Change Profile Picture
      </button>
    </div>
  );
};

export default Profile;
