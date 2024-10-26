import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Pencil,
  Trash,
  Search,
} from "lucide-react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/tasks", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSearchTasks = async () => {
    if (!searchKeyword) {
      fetchTasks();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/user/search?keyword=${searchKeyword}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("No tasks found matching your search criteria");
      }
    } catch (error) {
      console.error("Error searching for tasks:", error);
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/dashboard/update-task/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/delete/${taskId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusUpdate = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/update/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "completed" }),
        }
      );
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" />;
      case "in-progress":
        return <Clock className="text-blue-500" />;
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button
            onClick={() => navigate("/dashboard/new-task")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
          >
            <Plus className="mr-2" />
            Create New Task
          </button>
        </div>

        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="p-2 border border-gray-300 rounded-l-lg w-full"
          />
          <button
            onClick={handleSearchTasks}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-200 flex items-center"
          >
            <Search className="mr-2" />
          </button>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No tasks found. Create a new task to get started!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <h3 className="text-xl font-semibold text-gray-800 ml-2">
                        {task.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                          task.priorityLevel
                        )}`}
                      >
                        {task.priorityLevel}
                      </span>
                      <button
                        onClick={() => handleEditTask(task._id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <Pencil size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <Trash size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span>
                      Status: {task.status}{" "}
                      {task.status !== "completed" && (
                        <button
                          onClick={() => handleStatusUpdate(task._id)}
                          className="text-blue-500 hover:underline ml-2"
                        >
                          Mark Complete
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}