import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/user/signin",
        formData,
        { withCredentials: true }
      );

      if (response && response.data) {
        setMessage(response.data.message);
        console.log("User signed in successfully:", response.data.user);

        // Store user details in state
        setUser(response.data.user);

        // Mark user as authenticated
        setIsAuthenticated(true);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setMessage("Unexpected response format from the server.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || "Error signing in");
      } else {
        setMessage("An unexpected error occurred.");
      }
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;
