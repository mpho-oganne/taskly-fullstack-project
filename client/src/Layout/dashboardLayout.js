import React from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ManageTasks from '../Pages/Task/manageTasks';
import VirtualAssistant from '../components/VirtualAssistant/virtual-assistant'; 

function Layout() {
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-5 grid-rows-[2fr_3fr] gap-2 h-full">
          {/* Top Left Box */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            {/* Report Section */}
            Report Section
          </div>

          {/* Top Right Box */}
          <div className="col-span-3 bg-white p-4 rounded-lg shadow-md">
            <ManageTasks />
          </div>

          {/* Bottom Left Box */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            {/* Other Section */}
            Other Section
          </div>

          {/* Bottom Right Box - Manage Tasks */}
          {/* <div className="col-span-3 bg-white p-4 rounded-lg shadow-md">
            <ManageTasks />
          </div> */}
        </div>
      </div>


      <VirtualAssistant />{/* This triggers audio when layout is loaded */}
    </div>
  );
}

export default Layout;
