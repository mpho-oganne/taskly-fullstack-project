import React, { createContext, useState, useEffect } from "react";

// Create context
const UserContext = createContext();

// Context provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.setItem("isAuthenticated", "false");
    }
  }, [isAuthenticated]);

  // Signout function to handle user logout
  const signout = () => {
    // Make signout request to the backend on port 3001
    fetch("http://localhost:3001/user/signout", {
      method: "POST",
      credentials: "include", // Ensures session cookies are included
    })
      .then((response) => {
        if (response.ok) {
          setUser(null); // Clear the user data
          setIsAuthenticated(false); // Set authentication status to false
          localStorage.removeItem("isAuthenticated"); // Remove auth status from localStorage
          console.log("Signed out successfully");
        } else {
          console.error("Error signing out");
        }
      })
      .catch((err) => {
        console.error("Error making signout request:", err);
      });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, signout }} // Added signout here
    >
      {children}
    </UserContext.Provider>
  );
};

// Export UserProvider as default and UserContext as named export
export { UserContext };
export default UserProvider;
