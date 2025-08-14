const express = require('express');
const router = express.Router();
const { createAssessment, submitAssessment } = require('../controllers/assessmentController');
const auth = require('../middleware/authMiddleware');

router.post('/create', auth, createAssessment);
router.post('/submit', auth, submitAssessment);

module.exports = router;
