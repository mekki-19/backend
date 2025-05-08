// routes/classeRoutes.js
const express = require('express');
const router = express.Router();
const classeController = require('../controllers/classeController');

router.get('/eleve/:id', classeController.getClasseByEleve); // ✅ pour les élèves
router.get('/enseignant/:id', classeController.getClassesByEnseignant); // ✅ pour les enseignants
router.post('/', classeController.createClasse);

module.exports = router;
