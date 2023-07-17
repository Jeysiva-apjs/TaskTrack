const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jey:1234@todos.quaxmpm.mongodb.net/TaskTrack", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = mongoose;
