import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./Pages/Profile/profile";

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Navbar Section */}
      <Sidebar />

      {/* pages */}
      <div className="flex-grow">
        <Profile />
      </div>
    </div>
  );
}

export default Layout;
