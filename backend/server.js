import express from 'express';
import connectDb from './config/mongodb.js';
import dotenv from 'dotenv';
import cors from "cors";
import travelRoutes from './routes/travelRoutes.js';
import errandRoutes from "./routes/errandsRoutes.js";
import carpoolRoutes from "./routes/carpoolRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";

 import sosRoutes from "./routes/sosRoutes.js";
import authMiddleware from './middleware/authMiddleware.js';
import notificationRoutes from './routes/notificationRoutes.js';





dotenv.config();


const app = express();
const PORT  = process.env.PORT || 3000;
connectDb();


// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());


// travel routes
app.use("/api/travel",authMiddleware, travelRoutes);
app.use("/api/errands", errandRoutes);
app.use("/api/carpool", carpoolRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/notifications", authMiddleware, notificationRoutes);




app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});