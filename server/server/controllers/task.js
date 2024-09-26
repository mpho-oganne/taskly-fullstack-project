const Task = require('../models/task');

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priorityLevel, status } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
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
    res.status(500).send({ message: "Oopsie, can't seem to get the task" });
  }
};

// Get all tasks by userId
const getTasks = async (req, res) => {
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

    const parsedReminderTime = new Date(reminderTime);

    const existingReminder = task.reminders.find(
      (reminder) => reminder.reminderTime.getTime() === parsedReminderTime.getTime()
    );

    if (existingReminder) {
      return res.status(400).send({ error: 'Reminder already exists for this time' });
    }

    const newReminder = {
      reminderTime: parsedReminderTime,
      isSent: false,
    };

    task.reminders.push(newReminder);
    await task.save();

    res.status(200).send({ message: 'Reminder set successfully', task });
  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).send({ error: 'Error setting reminder' });
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
