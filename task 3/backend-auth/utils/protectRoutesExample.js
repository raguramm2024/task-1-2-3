import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example: protect existing task1 CRUD routes using the auth middleware.
// In task1, import protect and attach it to protected operations.
// const { protect } = require("../middleware/authMiddleware");

router.post("/tasks", protect, (req, res) => {
  res.json({ message: "Create task is protected", user: req.user });
});

router.put("/tasks/:id", protect, (req, res) => {
  res.json({ message: "Update task is protected", user: req.user });
});

router.delete("/tasks/:id", protect, (req, res) => {
  res.json({ message: "Delete task is protected", user: req.user });
});

export default router;
