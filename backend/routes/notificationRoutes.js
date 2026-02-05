import express from "express";
import {
  getNotifications,
  createNotification,
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's notifications
router.get("/", authMiddleware, getNotifications);

// Create notification (can be used by other routes)
router.post("/", createNotification);

export default router;
