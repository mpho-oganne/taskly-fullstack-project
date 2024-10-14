import React from 'react';
//import Sidebar from '../components/Sidebar/sidebar';
//import ManageTasks from '../Pages/Task/manageTasks';
//import Calendar from '../components/Calender/calender';
//import Overview from '../components/Overview/overview';
//import VirtualAssistant from '../components/VirtualAssistant/virtual-assistant'; 

export default function BlankDashboardGridLayout() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 border-r">
        <div className="h-16"></div>
        <nav className="space-y-4">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="h-6"></div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Welcome section */}
        <div className="h-20 mb-6"></div>

        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3 h-8"></div>
          <div className="flex items-center space-x-4">
            <div className="w-40 h-8"></div>
            <div className="w-8 h-8 rounded-full"></div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 border"></div>
          ))}
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="h-64 border"></div>
          ))}
        </div>

        {/* Task List */}
        <div className="h-64 border"></div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l">
        {/* Calendar section */}
        <div className="mb-6">
          <div className="h-6 mb-4"></div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="w-6 h-6"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(31)].map((_, index) => (
              <div key={index} className="w-6 h-6"></div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks, Reminders, Deadlines sections */}
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <div className="h-6 mb-3"></div>
            <div className="space-y-3">
              {[...Array(2)].map((_, itemIndex) => (
                <div key={itemIndex} className="h-8"></div>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}