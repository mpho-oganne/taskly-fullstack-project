const bcrypt = require("bcryptjs");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

// Configure multer storage for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Move up one directory to 'server' and then into 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure a unique filename
  },
});

const upload = multer({ storage: storage });

// Add code to sign up the user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Code for signing in the user
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }

    req.session.userId = user._id;

    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    res.send({ message: "Signed in successfully", user: sanitizedUser });
  } catch (error) {
    res.status(500).send({ error: "Error signing in" });
  }
};

// Sign out the user by destroying the session
const signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error signing out:", err);
      return res.status(500).send({ error: "Error signing out" });
    }

    res.status(200).send({ message: "Signed out successfully" });
  });
};

// Get signed-in user data/profile using their id
const getUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select(
      "name email profilePicture reports aiSuggestions"
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ user });
  } catch (error) {
    res.status(500).send({ error: "Error getting user info" });
  }
};

// Update signed-in user data/profile including profile picture
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update fields
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // If profile picture is uploaded, update the field
    if (req.file) {
      user.profilePicture = req.file.filename;
    }

    await user.save();

    req.session.userId = user._id;
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};
// Generate report based off user's tasks
const generateReport = async (req, res) => {};

// Get suggestions for the user powered by AI model
const getAISuggestions = async (req, res) => {};

module.exports = {
  signup,
  signin,
  signout,
  getUser,
  updateUser: [upload.single("profilePicture"), updateUser], // Add multer middleware to handle file uploads
  generateReport,
  getAISuggestions,
};
