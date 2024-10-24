import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/tasks', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("API returned non-array data:", data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditTask = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/delete/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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

  const filteredTasks = tasks.filter(task => filter ? task.status === filter || task.priorityLevel === filter : true);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Task List</h2>
        <ul className="space-y-4">
          <li className="text-blue-600 font-semibold">Dashboard</li>
          <li>Tasks</li>
          <li>Projects</li>
          <li>Team</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">All Tasks</h2>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">New Task</button>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </header>

        {/* Task List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No tasks found.
            </div>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-500">Task</th>
                  <th className="px-4 py-2 text-gray-500">Due Date</th>
                  <th className="px-4 py-2 text-gray-500">Status</th>
                  <th className="px-4 py-2 text-gray-500">Priority</th>
                  <th className="px-4 py-2 text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="border-b">
                    <td className="px-4 py-2 text-gray-800">{task.title}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${task.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : task.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${task.priorityLevel === 'high'
                          ? 'bg-red-100 text-red-700'
                          : task.priorityLevel === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {task.priorityLevel}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleEditTask(task._id)}
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskList;
