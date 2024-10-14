import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function Overview({ tasks }) {
  const now = new Date();

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress" && new Date(task.dueDate) >= now
  );
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending" && new Date(task.dueDate) >= now
  );

  const categories = [
    {
      label: "In Progress",
      value: inProgressTasks.length,
      icon: Clock,
      color: "blue",
    },
    {
      label: "Completed",
      value: completedTasks.length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Pending",
      value: pendingTasks.length,
      icon: AlertCircle,
      color: "yellow",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Task Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className={`bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:border-${color}-300`}
          >
            <div>
              <h3 className="text-base font-semibold text-gray-600">{label}</h3>
              <div className={`text-3xl font-bold text-${color}-600 mt-1`}>
                {value}
              </div>
            </div>
            <div className={`bg-${color}-100 p-2 rounded-full`}>
              <Icon className={`h-8 w-8 text-${color}-600`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
