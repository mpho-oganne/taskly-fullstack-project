const bcrypt = require('bcryptjs');

const  User = require('../models/user');

//Add code to sign up the user
const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

//Code for signing in the user
const signin = async (req, res) => {
 
};

// Sign out the user by destroying the session
const signout = async (req, res) => {
 
};

// Get signed in user data/profile using their id
const getUser = async (req, res) => {
};

// Update signed in user data/profile
const updateUser = async (req, res) => {
};

// Generate report based off user's tasks
const generateReport = async (req, res) => {
};


// Get suggestions for the user powered by AI model
const getAISuggestions = async (req, res) => {
};

module.exports = {
    signup,
    signin,
    signout,
    getUser,
    updateUser,
    generateReport,
    getAISuggestions
};
