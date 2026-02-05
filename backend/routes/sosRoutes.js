import express from "express";
import { createSOS, getAllSOS } from "../controllers/sosController.js";

const router = express.Router();

router.post("/", createSOS);   // POST /api/sos
router.get("/", getAllSOS);    // GET /api/sos

export default router;
