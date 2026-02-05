import express from "express";
import Errand from "../models/errandsModel.js";

const router = express.Router();


  //  POST /api/errands(Create a new errand)
 
 
router.post("/", async (req, res) => {
  try {
    const { title, location, requestedBy, priority } = req.body;

    if (!title || !location) {
      return res.status(400).json({
        success: false,
        message: "Title and location are required",
      });
    }

    const errand = await Errand.create({
      title,
      location,
      requestedBy,
      priority,
    });

    console.log("Saved errand:", errand); //  log AFTER creation

    res.status(201).json({
      success: true,
      data: errand,
    });
  } catch (error) {
    console.error("Create errand error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create errand",
      error: error.message,
    });
  }
});



    // GET /api/errands
 
router.get("/", async (req, res) => {
  try {
    const errands = await Errand.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: errands.length,
      data: errands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch errands",
    });
  }
});


    // PUT /api/errands/:id/accept
 
router.put("/:id/accept", async (req, res) => {
  try {
    const { acceptedBy } = req.body;

    const errand = await Errand.findById(req.params.id);

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    if (errand.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Errand is not available",
      });
    }

    errand.status = "accepted";
    errand.acceptedBy = acceptedBy || "Unknown";

    await errand.save();

    res.json({
      success: true,
      data: errand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to accept errand",
    });
  }
});


    
 
router.put("/:id/complete", async (req, res) => {
  try {
    const errand = await Errand.findById(req.params.id);

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    if (errand.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Errand must be accepted first",
      });
    }

    errand.status = "completed";
    await errand.save();

    res.json({
      success: true,
      data: errand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to complete errand",
    });
  }
});


  //  DELETE /api/errands/:id
 
router.delete("/:id", async (req, res) => {
  try {
    const errand = await Errand.findByIdAndDelete(req.params.id);

    if (!errand) {
      return res.status(404).json({
        success: false,
        message: "Errand not found",
      });
    }

    res.json({
      success: true,
      message: "Errand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete errand",
    });
  }
});

export default router;
