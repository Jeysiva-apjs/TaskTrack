const express = require("express");
const cors = require("cors");
const TASKS = require("./models/models");
require("./models/db");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

app.get("/tasks", async (req, res) => {
  const tasks = await TASKS.find({});
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await TASKS.find({ _id: req.params.id });
    res.json(task);
  } catch (Error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TASKS(req.body);
    await newTask.save();

    res.json({ message: "Todo  created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    await TASKS.findByIdAndUpdate({ _id: req.params.id }, req.body);
    if (TASKS.find({ _id: req.params.id })) {
      res.send("Updated successfully.");
    } else {
      res.status(404).send("Invalid ID");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await TASKS.findByIdAndDelete({ _id: req.params.id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on the port ${PORT}`);
});
