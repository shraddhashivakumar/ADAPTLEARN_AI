const express = require('express');
const router = express.Router();
const { updateProgress, getInsights } = require('../controllers/progressController');
const auth = require('../middleware/authMiddleware');

router.post('/update', auth, updateProgress);
router.get('/insights', auth, getInsights);

module.exports = router;
