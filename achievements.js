const express = require('express');
const router = express.Router();
const { getAchievements } = require('../controllers/achievementsController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAchievements);

module.exports = router;
