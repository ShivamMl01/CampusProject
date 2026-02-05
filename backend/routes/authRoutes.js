import { Router } from "express";
import { register, login } from "../controllers/authController.js";


const router = Router();
router.post("/register", register); // POST /api/register
router.post("/login", login); // POST /api/login


export default router;