const express = require('express');

const { validateSignUp } = require('../validation/signup');

const router = express.Router();
const {
    createTask,
    updateTask,
    getTasks,
    deleteTask,
    setReminder,
    filterTasks,
    searchTasks

  } = require('../controllers/task');
const { signup, signin, getUser, updateUser, signout } = require('../controllers/user');

// Signup route
router.post('/signup', validateSignUp, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/', getUser);
router.put('/update', updateUser);

// Task routes
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.get('/:id')
router.get('/tasks', getTasks);
router.delete('/delete/:id', deleteTask)
router.post('/setReminder', setReminder);
router.get('/filter', filterTasks); 
router.get('/search', searchTasks); 

// 


module.exports = router;