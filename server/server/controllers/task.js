const Task = require('../models/task');
const cron = require('node-cron');
const mongoose = require('mongoose');

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priorityLevel, status } = req.body;

    // Check if the dueDate is in the past
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);

    if (taskDueDate < currentDate) {
      return res.status(400).send({ error: 'Due date cannot be in the past' });
    }

    const task = new Task({
      title,
      description,
      dueDate: taskDueDate,
      priorityLevel,
      status,
      userId: req.session.userId, // UserId from session
    });

    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send({ message: "User not logged in" });
    }

    // Find the task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOne({ _id: req.params.id, userId });
    
    if (!task) {
      return res.status(404).send({ message: "Task not found or you do not have permission to update it" });
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a task by its ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: "Oopsie, can't seem to get the task" });
  }
};

// Get all tasks by userId
const getAllTasks = async (req, res) => {
  try {
    const userId = req.session.userId;  // UserId from session
    const tasks = await Task.find({ userId });

    if (tasks.length === 0) {
      return res.status(404).send({ message: "No tasks found for this user" });
    }

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Oopsie, can't seem to get the list of tasks" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Set a reminder
const setReminder = async (req, res) => {
  const { taskId, reminderTime } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    // Reminder time validation
    const parsedReminderTime = new Date(reminderTime);
    if (isNaN(parsedReminderTime.getTime())) {
      return res.status(400).send({ error: 'Invalid reminder time format' });
    }
    if (parsedReminderTime < new Date()) {
      return res.status(400).send({ error: 'Reminder time cannot be in the past' });
    }

    // Check for existing reminder
    const existingReminder = task.reminders.find(
      (reminder) => reminder.reminderTime && reminder.reminderTime.getTime() === parsedReminderTime.getTime()
    );
    if (existingReminder) {
      return res.status(400).send({ error: 'Reminder already exists for this time' });
    }

    // Create new reminder
    const newReminder = {
      id: mongoose.Types.ObjectId(),
      reminderTime: parsedReminderTime,
      isSent: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    task.reminders.push(newReminder);
    await task.save();

    // Schedule cron job
    const job = cron.schedule(parsedReminderTime, async () => {
      try {
        await sendReminder(taskId, newReminder);
      } catch (error) {
        handleReminderError(error, `Error sending reminder for task ${taskId}`);
      }
    }, { scheduled: false });

    job.run();

    res.status(200).send({ message: 'Reminder set successfully', task });
  } catch (error) {
    handleServerError(error, res);
  }
};

const handleServerError = (error, res) => {
  console.error('Error setting reminder:', error);
  res.status(500).send({ error: 'Error setting reminder' });
};

const handleReminderError = (error, message) => {
  console.error(message, error);
};

// Function to send reminder
const sendReminder = async (taskId, newReminder) => {
  console.log(`Sending reminder for reminder at ${newReminder.reminderTime}`);
  
  const task = await Task.findOneAndUpdate(
    { _id: taskId, "reminders.id": newReminder.id },
    { 
      $set: { 
        "reminders.$.isSent": true,
        "reminders.$.updatedAt": Date.now() 
      } 
    },
    { new: true }
  );

  if (!task) {
    console.error(`Task or reminder not found for reminder at ${newReminder.reminderTime}`);
  } else {
    console.log(`Reminder for task ${taskId} marked as sent`);
  }
};

// Filter tasks
const filterTasks = async (req, res) => {
  const { dueDate, priorityLevel, status } = req.query;
  const userId = req.session.userId;

  const filterCriteria = { userId };

  if (dueDate) filterCriteria.dueDate = dueDate;
  if (priorityLevel) filterCriteria.priorityLevel = priorityLevel;
  if (status) filterCriteria.status = status;

  try {
    const tasks = await Task.find(filterCriteria);

    if (tasks.length === 0) {
      return res.status(404).send({ message: 'No tasks found matching your filter criteria' });
    }

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Error filtering tasks' });
  }
};

// Search tasks
const searchTasks = async (req, res) => {
  const { keyword } = req.query;
  const userId = req.session.userId;

  try {
    const tasks = await Task.find({
      userId,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    if (tasks.length === 0) {
      return res.status(404).send({ message: 'No tasks found matching your search criteria' });
    }

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Error searching for tasks' });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTaskById,
  getAllTasks,
  deleteTask,
  setReminder,
  filterTasks,
  searchTasks,
};
