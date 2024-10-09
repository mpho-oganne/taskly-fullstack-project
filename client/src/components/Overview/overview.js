import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Fetch tasks for the signed-in user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/tasks', { withCredentials: true });
        setTasks(response.data?.tasks || []);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const countByPriority = (priority) => tasks.filter(task => task.priorityLevel === priority).length;
  const countByStatus = (status) => tasks.filter(task => task.status === status).length;

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overview">
      <h1>Task Overview</h1>
      <div className="overview-section">
        <h2>Total Tasks: {tasks.length}</h2>
      </div>
      <div className="overview-section">
        <h3>Tasks by Priority</h3>
        <p>High: {countByPriority('High')}</p>
        <p>Medium: {countByPriority('Medium')}</p>
        <p>Low: {countByPriority('Low')}</p>
      </div>
      <div className="overview-section">
        <h3>Tasks by Status</h3>
        <p>Not Started: {countByStatus('Not Started')}</p>
        <p>In Progress: {countByStatus('In Progress')}</p>
        <p>Completed: {countByStatus('Completed')}</p>
      </div>
    </div>
  );
};

export default Overview;
