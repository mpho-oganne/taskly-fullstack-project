import React, { useState, useEffect } from "react";

export default function DashboardHeader() {
  const [user, setUser] = useState(null);

  // Fetch the logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/", {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Display the logged-in user's name and welcome message */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {user ? `Hello, ${user.name}!` : "Dashboard"}
            </h1>
            <p className="text-sm text-gray-600">
              {user ? "Welcome to your dashboard." : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
