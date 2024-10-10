import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get('http://localhost:3001/task/tasks');
      setTasks(response.data);
    }
    fetchTasks();
  }, []);

  // Update task function
  const handleUpdateTask = async (updatedTask) => {
    await axios.put(`http://localhost:3001/task/${updatedTask._id}`, updatedTask);
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
  };

  // Delete task function
  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/task/delete/${taskId}`);
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  // Filter tasks based on the selected filter criteria
  const filteredTasks = tasks.filter(task => {
    return filter ? task.status === filter || task.priorityLevel === filter : true;
  });

  return (
    <div className="dashboard">
      <h2>Manage Tasks</h2>

      {/* Create Task Button */}
      <div className="flex justify-between items-center mb-4">
        <h3>Create Task</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/new-task')}
        >
          + Create Task
        </button>
      </div>

      {/* Filter section */}
      <div>
        <label>Filter by: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
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
      <ul>
        {filteredTasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priorityLevel}</p>
            <button onClick={() => setEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit Task Form (if a task is selected for editing) */}
      {editTask && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdateTask(editTask);
          setEditTask(null);
        }}>
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <textarea
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditTask(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
