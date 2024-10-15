import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa'; // Import icons

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
    navigate(`/dashboard/update-task/${taskId}`);
  };

  const handleCreateTask = () => {
    navigate('/dashboard/new-task');
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
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
        <div className="flex space-x-4 items-center">
          <button onClick={handleCreateTask} className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition flex items-center">
            <FaPlusCircle className="mr-2" /> New Task
          </button>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-600 shadow focus:ring-indigo-500 focus:border-indigo-500"
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
      <div className="bg-white shadow-lg rounded-xl p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No tasks found.
          </div>
        ) : (
          <table className="w-full text-left table-auto border-separate" style={{ borderSpacing: "0 10px" }}>
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-500 font-semibold text-sm">Task</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-sm">Due Date</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-sm">Status</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-sm">Priority</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-sm text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="bg-white shadow rounded-lg">
                  <td className="px-4 py-3 text-gray-800 font-medium">{task.title}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-right flex space-x-2">
                    <button
                      onClick={() => handleEditTask(task._id)}
                      className="text-indigo-600 hover:bg-indigo-100 rounded-full p-2"
                      title="Edit Task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-600 hover:bg-red-100 rounded-full p-2"
                      title="Delete Task"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskList;
