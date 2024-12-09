import mongoose from "mongoose";

// Task Schema for individual daily tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// Daily Task Record Schema
const dailyTaskRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
});

// Disorder Schema
const disorderSchema = new mongoose.Schema({
  disorderName: {
    type: String,
    enum: [
      "Depression",
      "Bipolar",
      "PTSD",
      "ADHD",
      "Schizophrenia",
      "Eating Disorder",
    ],
    required: true,
  },
  severity: {
    type: Number,
    min: 1,
    max: 10,
    default: null,
  },
  diagnosisDate: {
    type: Date,
    default: Date.now,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/.+@.+\..+/, "Please provide a valid email address"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  mentalDisorders: {
    type: [disorderSchema],
    default: [],
  },
  dailyTaskRecords: {
    type: [dailyTaskRecordSchema],
    default: [],
  },
  streak: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Compile model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
