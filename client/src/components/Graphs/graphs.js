import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { TrendingUp } from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TaskGraph({ tasks }) {
  const [lineData, setLineData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
          return gradient;
        },
        borderColor: "rgba(99, 102, 241, 0.8)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as the first day of the week
    return new Date(now.setDate(diff)).setHours(0, 0, 0, 0); // Monday at 00:00
  };

  useEffect(() => {
    const groupCompletedTasksByDay = (tasks) => {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const completedTasksPerDay = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
      };
      const today = new Date();
      const weekStart = getWeekStart();

      tasks.forEach((task) => {
        if (task.status === "completed") {
          // Check both updatedAt and createdAt for tasks completed before the update
          const taskDate = new Date(task.updatedAt || task.createdAt);
          if (taskDate >= weekStart && taskDate <= today) {
            const dayOfWeek = taskDate.toLocaleString("en-US", {
              weekday: "short",
            });
            if (daysOfWeek.includes(dayOfWeek)) {
              completedTasksPerDay[dayOfWeek] += 1;
            }
          }
        }
      });

      return Object.values(completedTasksPerDay);
    };

    const completedTasks = tasks.filter((task) => {
      const taskDate = new Date(task.updatedAt || task.createdAt);
      return task.status === "completed" && taskDate >= getWeekStart();
    });

    const completedTasksPerDay = groupCompletedTasksByDay(completedTasks);

    setLineData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: completedTasksPerDay,
        },
      ],
    }));
  }, [tasks]);

  const progressData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [
          tasks.filter((task) => {
            const taskDate = new Date(task.updatedAt || task.createdAt);
            return task.status === "completed" && taskDate >= getWeekStart();
          }).length,
          tasks.filter((task) => {
            const taskDate = new Date(task.updatedAt || task.createdAt);
            return task.status === "in-progress" && taskDate >= getWeekStart();
          }).length,
          tasks.filter((task) => {
            const taskDate = new Date(task.updatedAt || task.createdAt);
            return task.status === "pending" && taskDate >= getWeekStart();
          }).length,
        ],
        backgroundColor: [
          "rgba(52, 211, 153, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(251, 191, 36, 0.8)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Progress Card */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Weekly Task Progress
            </h2>
          </div>
          <div className="h-56 flex items-center justify-center">
            <Doughnut
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      padding: 16,
                      usePointStyle: true,
                    },
                  },
                  tooltip: {
                    backgroundColor: "#f9f9f9",
                    titleColor: "#1f2937",
                    bodyColor: "#4b5563",
                    titleFont: {
                      size: 16,
                      weight: "bold",
                    },
                    bodyFont: {
                      size: 14,
                    },
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.formattedValue;
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0
                        );
                        const percentage = Math.round(
                          (context.parsed / total) * 100
                        );
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
                cutout: "75%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Completed Tasks Line Graph */}
      <div className="lg:col-span-2 bg-indigo-50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-200 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Completed Tasks Per Day
            </h2>
            <div className="bg-indigo-100 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <div className="h-56">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Tasks Completed",
                    },
                    ticks: {
                      precision: 0,
                    },
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    backgroundColor: "#f9f9f9",
                    titleColor: "#1f2937",
                    bodyColor: "#4b5563",
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                      label: (context) =>
                        `Completed: ${context.formattedValue} tasks`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
