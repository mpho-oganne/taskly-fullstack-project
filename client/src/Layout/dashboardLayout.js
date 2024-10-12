import React from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ManageTasks from '../Pages/Task/manageTasks';
import VirtualAssistant from '../components/VirtualAssistant/virtual-assistant'; 

function Layout() {
  return (
    <div className="flex h-screen min-h-screen">
      {/* Sidebar Section */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-[1fr_1fr] gap-2 h-full"> {/* Use h-full for the grid */}
          {/* Top Left Box */}
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto"> {/* Allow scrolling */}
            {/* Report Section */}
            Report Section
          </div>

          {/* Top Right Box */}
          <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto"> {/* Allow scrolling */}
            <ManageTasks />
          </div>

          {/* Bottom Left Box */}
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto"> {/* Allow scrolling */}
            {/* Other Section */}
            Other Section
          </div>

          {/* Bottom Right Box - Manage Tasks */}
          <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto"> {/* Allow scrolling */}
            <ManageTasks />
          </div>
        </div>
      </div>


      <VirtualAssistant />{/* This triggers audio when layout is loaded */}
    </div>
  );
}

export default Layout;
