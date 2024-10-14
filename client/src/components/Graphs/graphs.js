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

export default function Graphs({ tasks }) {
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
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(59, 130, 246, 1)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const groupCompletedTasksByDay = (tasks) => {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const tasksPerDay = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
      };

      tasks.forEach((task) => {
        if (task.status === "completed") {
          const completionDate = new Date(task.dueDate);
          const dayOfWeek = completionDate.toLocaleString("en-US", {
            weekday: "short",
          });

          if (daysOfWeek.includes(dayOfWeek)) {
            tasksPerDay[dayOfWeek] += 1;
          }
        }
      });

      return Object.values(tasksPerDay);
    };

    const completedTasks = tasks.filter((task) => task.status === "completed");
    const tasksPerDay = groupCompletedTasksByDay(completedTasks);

    setLineData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: tasksPerDay,
        },
      ],
    }));
  }, [tasks]);

  const progressData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [
          tasks.filter((task) => task.status === "completed").length,
          tasks.filter((task) => task.status === "in-progress").length,
          tasks.filter((task) => task.status === "pending").length,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="col-span-1 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Task Progress
        </h2>
        <div className="h-56 flex items-center justify-center">
          {" "}
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
                      weight: "600",
                      family: "'Inter', sans-serif",
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                  },
                },
                tooltip: {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  titleFont: {
                    size: 16,
                    weight: "bold",
                    family: "'Inter', sans-serif",
                  },
                  bodyFont: {
                    size: 14,
                    family: "'Inter', sans-serif",
                  },
                  padding: 12,
                  cornerRadius: 8,
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
              cutout: "70%",
            }}
          />
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Completed Tasks Per Day
        </h2>
        <div className="h-56">
          {" "}
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
                    text: "Tasks",
                    font: {
                      size: 14,
                      weight: "600",
                      family: "'Inter', sans-serif",
                    },
                  },
                  ticks: {
                    precision: 0,
                    font: {
                      size: 12,
                      family: "'Inter', sans-serif",
                    },
                  },
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                    drawBorder: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 12,
                      family: "'Inter', sans-serif",
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  titleFont: {
                    size: 16,
                    weight: "bold",
                    family: "'Inter', sans-serif",
                  },
                  bodyFont: {
                    size: 14,
                    family: "'Inter', sans-serif",
                  },
                  padding: 12,
                  cornerRadius: 8,
                  callbacks: {
                    label: function (context) {
                      return `Completed: ${context.formattedValue} tasks`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
