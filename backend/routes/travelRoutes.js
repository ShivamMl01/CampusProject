import express from "express";
import mongoose from "mongoose";
import travelModel from "../models/travelModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Notification from "../models/notificationModel.js";

const router = express.Router();

  //  CREATE TRAVEL PLAN 
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { from, to, dateTime, mode } = req.body;
    const userId = req.user.id; //  FROM JWT

    if (!from || !to || !dateTime || !mode) {
      return res.status(400).json({
        success: false,
        message: "from, to, dateTime, mode are required",
      });
    }

    const parsedDate = new Date(dateTime);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid dateTime format",
      });
    }

    const travelPlan = await travelModel.create({
      user: userId,        //  FIX
      from,
      to,
      dateTime: parsedDate,
      mode: mode.toLowerCase(),
      joinedUsers: [],
    });

    return res.status(201).json({
      success: true,
      message: "Travel plan created successfully",
      data: travelPlan,
    });
  } catch (error) {
    console.error("CREATE TRAVEL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error : Unable to create travel plan",
      error: error.message,
    });
  }
});


  //  GET ALL TRAVEL PLANS
router.get("/", async (req, res) => {
  try {
    const travelPlans = await travelModel
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: travelPlans,
    });
  } catch (error) {
    console.error("FETCH TRAVEL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



  //  JOIN A TRAVEL PLAN (AUTH REQUIRED)
router.put("/join/:travelId", authMiddleware, async (req, res) => {
  try {
    const { travelId } = req.params;
    console.log("travelId", travelId);
    const userId = req.user.id;
    console.log("userId", userId);

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel ID",
      });
    }

    const travel = await travelModel.findById(travelId);

    if (!travel) {
      return res.status(404).json({
        success: false,
        message: "Travel plan not found",
      });
    }

    //  Prevent duplicate join
    const alreadyJoined = travel.joinedUsers.some(
      (u) => u.user.toString() === userId
    );

    if (alreadyJoined) {
      return res.status(200).json({
        success: true,
        message: "Already joined",
        data: travel,
      });
    }

    //  Join
    travel.joinedUsers.push({ user: userId });
    await travel.save();

    //  Notify travel creator
    await Notification.create({
      userId: travel.user,
      message: `${req.user.name} joined your travel from ${travel.from} to ${travel.to}`,
    });

    await travel.populate("joinedUsers.user", "name email");

    return res.status(200).json({
      success: true,
      message: "Joined travel successfully",
      data: travel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error: unable to join travel",
      error: error.message,
    });
  }
});

export default router;
