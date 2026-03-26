const express = require('express');
const { getStats, getAnalytics } = require('../controllers/dashboardController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/stats', getStats);
router.get('/analytics', getAnalytics);

module.exports = router;
