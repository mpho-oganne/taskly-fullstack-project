import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    status: '',
    priorityLevel: '',
    dueDate: '',
  });
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  // Fetch all tasks when the component mounts
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('http://localhost:3001/task/tasks', {
          credentials: 'include',
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  // Fetch filtered tasks based on filter criteria
  useEffect(() => {
    const fetchFilteredTasks = async () => {
      try {
        const queryParams = new URLSearchParams();

        // Add filters to the query parameters
        if (filter.dueDate) queryParams.append('dueDate', filter.dueDate);
        if (filter.priorityLevel) queryParams.append('priorityLevel', filter.priorityLevel);
        if (filter.status) queryParams.append('status', filter.status);

        const response = await fetch(`http://localhost:3001/task/filter`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('API returned non-array data:', data);
          setTasks([]); // Handle non-array data
        }
      } catch (error) {
        console.error('Error fetching filtered tasks:', error);
        setTasks([]);
      }
    };

    // Fetch filtered tasks only if there's at least one active filter
    if (filter.dueDate || filter.priorityLevel || filter.status) {
      fetchFilteredTasks();
    }
  }, [filter]);

  // Update task function
  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        setEditTask(null);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task function
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/task/delete/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  // Filtered tasks based on current filter state
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter.status ? task.status === filter.status : true;
    const priorityMatch = filter.priorityLevel ? task.priorityLevel === filter.priorityLevel : true;
    const dueDateMatch = filter.dueDate ? task.dueDate === filter.dueDate : true;
    return statusMatch && priorityMatch && dueDateMatch;
  });

  return (
    <div className="dashboard w-full md:w-1/4 p-4 overflow-y-auto">
      {/* Create Task Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Tasks</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/new-task')}
        >
          + Create Task
        </button>
      </div>

      {/* Filter section */}
      <div className="mb-4">
        <label className="block text-gray-700">Filter by:</label>
        <select
          name="status"
          onChange={handleFilterChange}
          value={filter.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="priorityLevel"
          onChange={handleFilterChange}
          value={filter.priorityLevel}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          name="dueDate"
          onChange={handleFilterChange}
          value={filter.dueDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
        />
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <li key={task._id} className="py-2 flex items-center">
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-700">{task.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>Status: {task.status}</span> | <span>Priority: {task.priorityLevel}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <button
                    onClick={() => setEditTask(task)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Edit Task Form (if a task is selected for editing) */}
      {editTask && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTask(editTask);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
                ></textarea>
              </div>
              {/* Add more fields if necessary */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditTask(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}