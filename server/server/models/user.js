const mongoose = require("mongoose");

// Report Schema

const reportSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  completedTasksCount: {
    type: Number,
    default: 0,
  },
  pendingTasksCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// AI Suggestions Schema

const aiSuggestionsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  suggestedTasks: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  reasonForSuggestion: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    reports: [reportSchema], // Embedding the Report schema
    aiSuggestions: [aiSuggestionsSchema], // Embedding the AI Suggestions schema
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model("User", userSchema);
