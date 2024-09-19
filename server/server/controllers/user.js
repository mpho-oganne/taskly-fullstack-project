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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        req.session.userId = user._id;
        res.send({ message: 'Signed in successfully', user });
    } catch (error) {
        res.status(500).send({ error: 'Error signing in' });
    }
};

// Sign out the user by destroying the session
const signout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error signing out:', err);
            return res.status(500).send({ error: 'Error signing out' });
        }

        res.redirect('/signup'); 
    });
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
