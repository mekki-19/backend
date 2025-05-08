const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // ou authController si tu le sépares

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
