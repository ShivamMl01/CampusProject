import express from "express";
import Carpool from "../models/carpoolModel.js";

const router = express.Router();

    //  Create a new carpool (POST /carpool)
 
router.post("/", async (req, res) => {
      console.log(" Carpool body:", req.body);

  try {
    const { from, to, dateTime, seats, pickup, requestedBy } = req.body;

    if (!from || !to || !dateTime) {
      return res.status(400).json({
        success: false,
        message: "from, to and dateTime are required",
      });
    }

    const carpool = await Carpool.create({
      from,
      to,
      dateTime,
      seats,
      pickup,
      requestedBy,
    });

    res.status(201).json({
      success: true,
      message: "Carpool created successfully",
      data: carpool,
    });
  } catch (error) {
    console.error("Create carpool error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create carpool",
    });
  }
});


//    GET /carpool  Get all carpools
 
 
router.get("/", async (req, res) => {
  try {
    const carpools = await Carpool.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: carpools,
    });
  } catch (error) {
    console.error("Fetch carpools error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch carpools",
    });
  }
});


  //  PUT /carpool/join/:id( Join a carpool (decrease seats))
   

router.put("/join/:id", async (req, res) => {
  try {
    const carpool = await Carpool.findById(req.params.id);

    if (!carpool) {
      return res.status(404).json({
        success: false,
        message: "Carpool not found",
      });
    }

    if (carpool.seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    carpool.seats -= 1;
    await carpool.save();

    res.json({
      success: true,
      message: "Joined carpool successfully",
      data: carpool,
    });
  } catch (error) {
    console.error("Join carpool error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join carpool",
    });
  }
});


  // DELETE /carpool/:id
 
router.delete("/:id", async (req, res) => {
  try {
    await Carpool.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Carpool deleted successfully",
    });
  } catch (error) {
    console.error("Delete carpool error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete carpool",
    });
  }
});

export default router;
