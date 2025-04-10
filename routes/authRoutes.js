const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { userValidate, signupValidator, loginValidator } = require('../validators/userValidator');

// Public routes
router.post('/login', authController.login);
router.post('/register', signupValidator, userValidate, authController.register);
router.post('/googleLogin', authController.googleLogin);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);

module.exports = router;