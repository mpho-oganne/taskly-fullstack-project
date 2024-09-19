const express = require('express');
const router = express.Router();

const { validateSignUp } = require('../validation/signup');

const { signup, signin, signout } = require('../controllers/user');

// Signup route
router.post('/signup', validateSignUp, signup);
router.post('/signin', signin);
router.post('/signout', signout);


module.exports = router;