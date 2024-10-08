const mongoose = require("mongoose");

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  isSent: {
    type: Boolean,
    required: true,
    default: false,
  },
  reminderTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Task Schema
const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: false,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priorityLevel: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed", "overdue"],
  },
  reminders: [reminderSchema], // Embedding the Reminder schema
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
