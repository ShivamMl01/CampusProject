import express from 'express';
import connectDb from './config/mongodb.js';
import dotenv from 'dotenv';
import cors from 'cors';  // Fixed capitalization for consistency
import travelRoutes from './routes/travelRoutes.js';
import errandRoutes from './routes/errandsRoutes.js';
import carpoolRoutes from './routes/carpoolRoutes.js';
import authRoutes from './routes/authRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import sosRoutes from './routes/sosRoutes.js';  // Removed leading space
import authMiddleware from './middleware/authMiddleware.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDb();

// Middleware
app.use(cors({
  origin: ['http://campusprojectbackend.vercel.app', 'https://campusprojectbackend.vercel.app', 'https://campusprojectfrontend.vercel.app'],  // Allow both HTTP/HTTPS and both domains (adjust based on actual frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Added OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],  // Common headers; add more if needed
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/travel', authMiddleware, travelRoutes);
app.use('/api/errands', errandRoutes);
app.use('/api/carpool', carpoolRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// For Vercel: Export the app
// module.exports = app;