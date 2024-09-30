const express = require('express');
const auth = require('../middleware/auth');
const { validateSignUp } = require('../validation/signup');

const router = express.Router();
const {
    createTask,
    updateTask,
    getAllTasks,
    deleteTask,
    setReminder,
    filterTasks,
    searchTasks,
    getTaskById
} = require('../controllers/task');
const { signup, signin, getUser, updateUser, signout } = require('../controllers/user');

// Signup routes
router.post('/signup', validateSignUp, signup);
router.post('/signin', signin);
router.post('/signout', auth, signout);
router.get('/', auth, getUser);
router.put('/update', auth, updateUser);

// Task routes
router.post('/create', auth, createTask);
router.put('/update/:id', auth, updateTask);
router.get('/:id', auth, getTaskById);  // Fixed route to include auth and correct path
router.get('/tasks', auth, getAllTasks);  // Corrected path for getting all tasks
router.delete('/delete/:id', auth, deleteTask);
router.post('/setReminder', auth, setReminder);
router.get('/filter', auth, filterTasks);
router.get('/search', auth, searchTasks);

module.exports = router;
