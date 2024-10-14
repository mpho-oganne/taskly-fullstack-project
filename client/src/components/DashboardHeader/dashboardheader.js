import React from "react";
import { Search } from "lucide-react";

export default function DashboardHeader({ onSearch }) {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)} // Call onSearch when typing
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
