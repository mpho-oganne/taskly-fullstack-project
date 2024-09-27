const Task = require('../models/task'); 
const validator = require('validator'); 
const cron = require('node-cron');



const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priorityLevel, status, categoryId } = req.body;
        const task =  new Task({
        title,
        description,
        dueDate,
        priorityLevel,
        status,
        categoryId,
        userId: req.session.userId });

      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Update a task
  const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(task);
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
      res.status(500).send({ message: "Opssie can't seem to get the task"});
    }
  };
  
  // Get tasks by userId
  const getAllTasks = async (req, res) => {
    try {
      const userId = req.params.userId;  // Extract userId from URL parameters
      const tasks = await Task.find({ userId }); // Find tasks by userId
      if (tasks.length === 0) {
        return res.status(404).send({ message: "No tasks found for this user" });
      }
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({ message: "Opssie can't seem to get the list of tasks"});
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

//Optionally set a reminder
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

    // Create new reminder matching the schema
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

// Error handling function
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
  const { dueDate, priorityLevel, status, categoryId } = req.query;
  const userId = req.session.userId;

  const filterCriteria = { userId };

  if (dueDate) filterCriteria.dueDate = dueDate;
  if (priorityLevel) filterCriteria.priorityLevel = priorityLevel;
  if (status) filterCriteria.status = status;
  if (categoryId) filterCriteria.categoryId = categoryId;

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

// Search filter

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
    searchTasks
};
