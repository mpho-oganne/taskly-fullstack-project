import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('http://localhost:3001/task/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // include credentials for session-based auth
        });
        
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  // Update task function
  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:3001/task/update/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedTasks = tasks.map(task => (task._id === updatedTask._id ? updatedTask : task));
        setTasks(updatedTasks);
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTask(editTask);
          }}
        >
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