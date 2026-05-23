const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

// Public - list tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Protected - create task
router.post("/", protect, async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Protected - update task
router.put("/:id", protect, async (req, res, next) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Protected - delete task
router.delete("/:id", protect, async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;