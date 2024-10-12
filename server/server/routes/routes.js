const express = require("express");
const auth = require("../middleware/auth");
const { validateSignUp } = require("../validation/signup");

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
  readPendingTasks
} = require("../controllers/task");
const {
  signup,
  signin,
  getUser,
  updateUser,
  signout,
} = require("../controllers/user");

// Signup routes
router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.post("/signout", auth, signout);
router.get("/", auth, getUser);
router.put("/update", auth, updateUser);

// Task routes
router.post("/create", auth, createTask);
router.put("/update/:id", auth, updateTask);
router.get("/getTask/:id", auth, getTaskById);
router.get("/tasks", auth, getAllTasks);
router.delete("/delete/:id", auth, deleteTask);
router.post("/setReminder", auth, setReminder);
router.get("/filter", auth, filterTasks);
router.get("/search", auth, searchTasks);
router.get('/suggest', auth, suggestTasks);
router.get('/pendingTasks', auth, readPendingTasks);

module.exports = router;
