import React from 'react';
import UpdateTaskForm from './updateTask';  // Import the form component
//import { useParams } from 'react-router-dom';  // To get the taskId from the URL
// code looks good
export default function UpdateTaskPage() {

  //hard coded taskId needs to be retrieved from params
  const taskId  = '67028cbc3be34cb4fbc51ed5';  // Get the taskId from the URL (if using react-router)

  return (
    <div className="update-task-page">
      <h1>Update Task</h1>
      <UpdateTaskForm taskId={taskId} />  {/* Pass the taskId to the form */}
    </div>
  );
}
