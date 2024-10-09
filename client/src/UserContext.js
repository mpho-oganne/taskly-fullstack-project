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

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Export UserProvider as default and UserContext as named export
export { UserContext };
export default UserProvider;
