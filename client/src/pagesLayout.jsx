import React from 'react';
import Navbar from './components/Pages/Navbar/navbar';
import Profile from './components/Pages/Profile/profile';  

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Navbar Section */}
      <Navbar />
      
      {/* pages */}
      <div className="flex-grow">
        <Profile />

      </div>
    </div>
  );
}

export default Layout;
