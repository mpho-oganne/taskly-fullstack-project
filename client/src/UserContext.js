import React, { createContext, useState, useEffect } from "react";

// Create context
const UserContext = createContext();

// Context provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Check if the user is already authenticated when the app loads
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/", {
          credentials: "include", // To include cookies for session
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Set user data from the backend
          setIsAuthenticated(true); // Mark as authenticated
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isAuthenticated) {
      checkUserAuth();
    }
  }, [isAuthenticated]);

  // Signout function to handle user logout
  const signout = () => {
    fetch("http://localhost:3001/user/signout", {
      method: "POST",
      credentials: "include", // Ensures session cookies are included
    })
      .then((response) => {
        if (response.ok) {
          setUser(null); // Clear user data
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
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, signout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Export UserProvider as default and UserContext as named export
export { UserContext };
export default UserProvider;
