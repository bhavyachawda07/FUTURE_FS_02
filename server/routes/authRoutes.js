const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { validateRegister } = require('../middleware/validationMiddleware');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
