const Task = require('../models/task');
const Category = require('../models/category');

// Create a new task
const createTask = async (req, res) => 
  {
  try {
    const userId = req.session.userId; // Get userId from session 

    if (!userId) 
      {
      return res.status(401).send({ error: 'Unauthorized, no user with that namee or password' });
    }

    const { title, description, dueDate, priorityLevel, categoryId } = req.body; // defining my req.body

    // check category using categoryid 
    const category = await Category.findById(categoryId);
    if (!category) 
      {
      return res.status(404).send({ error: 'Category not found' });
    }

    // Create the task with userId included
    const task = new Task
    ({
      title,
      description,
      dueDate,
      priorityLevel,
      categoryId,
      userId 
    });

    await task.save();
    res.status(201).send(task);
  } catch (error) 
  {
    res.status(400).send({ error: 'Error creating task', details: error });
  }
};

// Update a task by its ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
      { new: true, runValidators: true });
    if (!task) 
      {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a task by its ID
const getTaskById = async (req, res) => 
  {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get tasks for the logged-in user
const getTasks = async (req, res) =>
   {
  try {
    const userId = req.session.userId; // Get userId from session

    if (!userId) 
      {
      return res.status(401).send({ error: 'Unauthorized, no user session found' });
    }

    // Fetch tasks for the logged-in user using their userID obviously 
    const tasks = await Task.find({ userId });

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a task by its ID
const deleteTask = async (req, res) => 
  {
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

// Optionally set a reminder for a task
const setReminder = async (req, res) => {
  const { taskId, reminderTime } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    const parsedReminderTime = new Date(reminderTime);

    // Check if a reminder already exists for this time
    const existingReminder = task.reminders.find(
      (reminder) => reminder.reminderTime.getTime() === parsedReminderTime.getTime()
    );

    if (existingReminder) {
      return res.status(400).send({ error: 'Reminder already exists for this time' });
    }

    // Add the new reminder
    const newReminder = {
      reminderTime: parsedReminderTime,
      isSent: false,
    };

    task.reminders.push(newReminder);
    await task.save();

    // Handle reminder notification logic here, if applicable

    res.status(200).send({ message: 'Reminder set successfully', task });
  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).send({ error: 'Error setting reminder' });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTaskById,
  getTasks,
  deleteTask,
  setReminder,
};
