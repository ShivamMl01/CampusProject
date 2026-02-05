import Notification from "../models/notificationModel.js";

// GET user notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// CREATE notification (internal use)
export const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = await Notification.create({
      user: userId,
      message,
    });

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};
