import express from "express";
import {
  createEmergency,
  getAllEmergencies,
} from "../controllers/emergencyController.js";

const router = express.Router();

router.post("/", createEmergency);   // POST /api/emergency
router.get("/", getAllEmergencies);  // GET /api/emergency

export default router;
