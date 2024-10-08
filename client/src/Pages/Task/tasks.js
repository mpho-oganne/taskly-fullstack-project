import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/task/tasks');
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Tasks List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex justify-between mb-2">
                <div className="text-gray-600 text-sm">
                  {new Date(task.dueDate).toLocaleDateString()} {/* Format due date */}
                </div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-700 mt-1">{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
