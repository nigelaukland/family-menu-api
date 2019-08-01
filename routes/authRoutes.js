const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');

// POST new user signup
router.post('/signup', authController.postSignUp);

// POST user login
router.post('/login', authController.postLogin);

// POST user logout
// router.post('/logout', authController.postLogout);

module.exports = router;
