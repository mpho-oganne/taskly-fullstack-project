import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Overview = () => {
  const [tasks, setTasks] = useState([]);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [workingHours, setWorkingHours] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setTasks(data);

          const hoursPerDay = {
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
          };

          data.forEach((task) => {
            if (task.status === "completed" && task.startTime && task.endTime) {
              const start = new Date(task.startTime);
              const end = new Date(task.endTime);
              const duration = (end - start) / (1000 * 60 * 60);
              const day = start.toLocaleString("en-US", { weekday: "short" });

              if (day in hoursPerDay) {
                hoursPerDay[day] += duration;
              }
            }
          });

          setWorkingHours(hoursPerDay);

          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const upcoming = data.filter((task) => {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= now;
          });

          const sortedUpcoming = upcoming.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
          );

          setUpcomingReminders(sortedUpcoming);
        } else {
          console.error("API returned non-array data:", data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const now = new Date();

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress" && new Date(task.dueDate) >= now
  );
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending" && new Date(task.dueDate) >= now
  );

  const progressData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Task Progress",
        data: [
          completedTasks.length,
          inProgressTasks.length,
          pendingTasks.length,
        ],
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const workingHoursData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Working Hours",
        data: Object.values(workingHours),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-2 py-6">
      {" "}
      {/* Decreased padding (px-2), limited outer width (max-w-5xl) */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {" "}
        {/* Increased content width (max-w-2xl) */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Overview</h1>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-medium text-gray-600">In Progress</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-blue-600"
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {inProgressTasks.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-medium text-gray-600">Completed</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="text-lg font-bold text-green-600">
              {completedTasks.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-medium text-gray-600">Pending</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-yellow-600"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="text-lg font-bold text-yellow-600">
              {pendingTasks.length}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Task Progress
            </h2>
            <div className="h-48">
              <Doughnut
                data={progressData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Working Hours
            </h2>
            <div className="h-48">
              <Line
                data={workingHoursData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
