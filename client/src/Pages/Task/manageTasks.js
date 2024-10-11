import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './tasks';

export default function ManageTasks() {
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate('/new-task');
  };

  return (
    <div className="p-4 grid grid-cols-1 gap-4 h-full">
      {/* New Task Box */}
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-lg font-bold">New Task</h2>
        <button
          onClick={handleCreateTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Create
        </button>
      </div>

      {/* Task List Section */}
      <div className="bg-white p-4 rounded-lg shadow-md h-[350px] overflow-y-auto">
        <TaskList />
      </div>
    </div>
  );
}
