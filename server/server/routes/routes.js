const express = require('express');
const auth = require('../middleware/auth');

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
const {validateSignUp} = require('../validation/signup');

// Signup routes
router.post('/signup', validateSignUp, signup);
router.post('/signin', signin);
router.post('/signout', auth, signout);
router.get('/profile', auth, getUser);
router.put('/update', auth, updateUser);

// Task routes
router.post('/create', createTask);
router.put('/update/:id', auth, updateTask);
router.get('/getTask/:id', auth, getTaskById);
router.get('/tasks', auth, getAllTasks);
router.delete('/delete/:id', auth, deleteTask)
router.post('/setReminder', auth, setReminder);
router.get('/filter', auth, filterTasks);
router.get('/search', auth, searchTasks);

module.exports = router;
