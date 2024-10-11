import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";

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
        const response = await fetch("http://localhost:3001/task/tasks", {
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
        backgroundColor: ["#4CAF50", "#2196F3", "#FFEB3B"],
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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* Top section for task stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-600">In Progress</h3>
          <p className="text-2xl font-bold text-blue-500">
            {inProgressTasks.length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-600">Completed</h3>
          <p className="text-2xl font-bold text-green-500">
            {completedTasks.length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">
            {pendingTasks.length}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-8 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Charts</h3>
          <div className="flex gap-8">
            <div
              className="flex-1"
              style={{ height: "350px", maxWidth: "300px" }}
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Task Progress
              </h3>
              <Doughnut data={progressData} />
            </div>

            <div
              className="flex-1"
              style={{ height: "350px", maxWidth: "300px" }}
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Working Hours
              </h3>
              <Line data={workingHoursData} />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Upcoming Reminders
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {upcomingReminders.length > 0 ? (
              upcomingReminders.map((task, idx) => (
                <li key={idx} className="text-sm text-gray-600">
                  {task.title} - Due on{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No upcoming reminders.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
