import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dns from 'dns';
import songroutes from './src/routes/Songroute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/Albumroute.js';
import userRouter from './src/routes/userRoutes.js';

// Safe DNS configuration for local development
try {
  if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
} catch (e) {
  console.log("DNS configuration skipped:", e.message);
}

const app = express();
const PORT = process.env.PORT || 4000;

// Connect Database & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, "http://localhost:5173"] : true,
  credentials: true
}));
app.use(express.json());

// Health Check & Root Endpoints
app.get('/', (req, res) => {
  res.send('Spotify Backend API is running successfully!');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/song', songroutes);
app.use('/api/album', albumRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});