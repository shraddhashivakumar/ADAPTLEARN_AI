// Load environment variables from .env
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require("cors");

// Import route modules
const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessment');
const tutorRoutes = require('./routes/tutor'); // ✅ only once
const lessonsRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');
const achievementsRoutes = require('./routes/achievements');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Health check & welcome routes ---
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Adaptive Learning API is running 🚀',
    documentation: '/api',
    serverTime: new Date().toISOString()
  });
});

// API root route to list all available endpoints
app.get('/api', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Adaptive Learning API - Available Endpoints',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      assessments: {
        create: 'POST /api/assessments/create',
        submit: 'POST /api/assessments/submit'
      },
      tutor: {
        chat: 'POST /api/tutor/chat'
      },
      lessons: {
        getLesson: 'POST /api/lessons'
      },
      progress: {
        update: 'POST /api/progress/update',
        insights: 'GET /api/progress/insights'
      },
      achievements: {
        list: 'GET /api/achievements'
      }
    }
  });
});

// --- Attach API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/tutor', tutorRoutes); // ✅ once
app.use('/api/lessons', lessonsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/achievements', achievementsRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
