const express = require("express");
const auth = require("../middleware/auth");
const { validateSignUp } = require("../validation/signup");
const { updateProfilePicture, removeProfilePicture } = require('../controllers/user');
const multer = require('multer');

// Configure multer using memory storage for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
  setReminder,
  filterTasks,
  searchTasks,
  getTaskById,
  suggestTasks,
  readPendingTasks,
  generateReport
} = require("../controllers/task");

// User routes

const {
  signup,
  signin,
  getUser,
  updateUser,
  signout,
  getLeaderboard,
} = require("../controllers/user");
const { default: RewardsCard } = require("../../../client/src/components/TaskRewards/taskRewards");


// Signin & Signup routes
router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.post("/signout", auth, signout);
router.get("/", auth, getUser);
router.put("/update", auth, updateUser);

//Profile routes
// router.put('/updatePicture', upload.single('profilePicture'), updateProfilePicture);
// router.put('/removePicture', removeProfilePicture);

// Task routes
router.post("/create", auth, createTask);
router.put("/update/:id", auth, updateTask);
router.get("/getTask/:id", auth, getTaskById);
router.get("/tasks", auth, getAllTasks);
router.delete("/delete/:id", auth, deleteTask);
router.post("/setReminder", auth, setReminder);
router.get("/cd filter", auth, filterTasks);
router.get("/search", auth, searchTasks);
router.get('/suggest', auth, suggestTasks);
router.get('/pendingTasks', auth, readPendingTasks);
router.get('/reports', auth, generateReport);   // router for generate report function 
router.get("/leaderboard", auth, getLeaderboard);
router.get("/tasks/rewards", auth, RewardsCard);
module.exports = router;
