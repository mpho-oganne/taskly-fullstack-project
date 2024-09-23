const Task = require('../models/task'); 

const cron = require('node-cron');

//create a task
const createTask = async (req, res) => {
};

//update a task
const updateTask = async (req, res) => {
};

//get task by id 

const getTaskById = async (req, res) => {

};

//get all tasks
const getTasks = async (req, res) => {
};

//delete a task
const deleteTask = async (req, res) => {
};

//Optionally set a reminder

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