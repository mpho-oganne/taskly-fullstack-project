import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/task/tasks', {
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
      const response = await fetch(`http://localhost:3001/task/delete/${taskId}`, {
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
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold mb-2">Tasks List</h2>

      {/* Filter Section */}
      <div className="mb-2">
        <select onChange={(e) => setFilter(e.target.value)} value={filter} className="border rounded-md p-1 text-sm">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {/* Task List */}
      <div className="flex-grow overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div key={task._id} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {task.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <p className="text-gray-700 mt-1">{task.description}</p>

                <div className="flex justify-end mt-2">
                  <button
                    className="text-blue-500 hover:underline mr-4"
                    onClick={() => handleEditTask(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
