import React from 'react';
import Sidebar from './components/Sidebar/sidebar';
import Profile from './Pages/Profile/profile';  
import Overview from './components/Overview/overview';

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Navbar Section */}
      <Sidebar />

      {/* pages */}
      <div className="flex-grow">
        <Profile />
        <Overview/>
      </div>
    </div>
  );
}

export default Layout;
