import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the sign-in page
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the protected content
  return children;
};

export default RequireAuth;