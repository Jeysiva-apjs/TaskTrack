const express = require("express");
const TASKS = require("../database/models");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await TASKS.find({});
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  try {
    const task = await TASKS.find({ _id: req.params.id });
    res.json(task);
  } catch (Error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = new TASKS(req.body);
    await newTask.save();

    res.json({ message: "Todo  created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    await TASKS.findByIdAndDelete({ _id: req.params.id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
