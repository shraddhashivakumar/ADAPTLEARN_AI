const express = require('express');
const router = express.Router();
const { getLesson } = require('../controllers/lessonsController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, getLesson);

module.exports = router;
