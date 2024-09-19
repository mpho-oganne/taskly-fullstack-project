const express = require('express');
const router = express.Router();

const { validateSignUp } = require('../middleware/auth');

const { signup } = require('../controllers/user');

// Signup route
router.post('/signup', validateSignUp, signup);

module.exports = router;