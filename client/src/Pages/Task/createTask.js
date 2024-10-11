import React, { useState } from 'react';

// code looks good, suggestion made
export default function CreateTaskForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priorityLevel: 'medium',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3001/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create task'); // generic error message, helpful to parse through response and see actual error
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priorityLevel: 'medium',
        status: 'pending'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-900 p-4 rounded-md border border-red-200">
                <h3 className="font-semibold">Error</h3>
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 text-green-900 p-4 rounded-md border border-green-200">
                <h3 className="font-semibold">Success</h3>
                <p>Task created successfully!</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
                <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}  // Restrict past dates
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
    </label>
  </div>


            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Priority Level
                <select
                  name="priorityLevel"
                  value={formData.priorityLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="pending">pending</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </select>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Creating Task...' : 'Create Task'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
