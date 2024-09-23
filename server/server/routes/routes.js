const express = require('express');

const { validateSignUp } = require('../validation/signup');

const { signup, signin, signout } = require('../controllers/user');
const router = express.Router();
const {
    createTask,
    updateTask,
    getTasks,
    deleteTask,
    setReminder
  } = require('../controllers/task');

// Signup route
router.post('/signup', validateSignUp, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/', getUser)
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.get('/:id')
router.get('/', getTasks);
router.delete('/delete/:id', deleteTask)
router.post('/setReminder', setReminder); 


module.exports = router;