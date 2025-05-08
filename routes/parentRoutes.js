// routes/parentRoutes.js
const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// Exemple de route basique
router.get('/', parentController.getAllParents);

module.exports = router;
