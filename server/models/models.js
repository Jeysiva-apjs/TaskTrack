const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  todo: String,
  isComplete: Boolean,
});

const TASKS = mongoose.model("task", taskSchema);

module.exports = TASKS;
