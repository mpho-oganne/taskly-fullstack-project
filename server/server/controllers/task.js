const Task = require('../models/task'); 


// Create a new task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
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
    res.status(500).send(error);
  }
};

// Get tasks by userId
const getTasks = async (req, res) => {
  try {
    const userId = req.query.userId; 
    const tasks = await Task.find({ userId });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
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

// Optionally set a reminder
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

    const newReminder = new Reminder({
      reminderTime: parsedReminderTime,
      isSent: false,
    });

    task.reminders.push(newReminder);
    await task.save();

    const job = cron.schedule(parsedReminderTime, async () => {
      try {
        console.log(`Sending reminder for task ${taskId}`);
        await Reminder.findByIdAndUpdate(newReminder._id, { isSent: true });
        job.stop();
      } catch (error) {
        console.error('Error sending reminder:', error);
      }
    });

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
  setReminder
};
