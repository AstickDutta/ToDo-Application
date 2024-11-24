const express = require('express');
const { signUp, login, logout } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { userValidationSchema, loginValidationSchema } = require('../utils/validationSchemas');
const validateRequest = require('../middlewares/validationRequest');

const router = express.Router();

router.post('/signup', validateRequest(userValidationSchema), signUp);

router.post('/login', validateRequest(loginValidationSchema), login);

router.post('/logout/:id', protect, logout)

module.exports = router;
