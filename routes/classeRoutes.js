// routes/classeRoutes.js ✅ CORRECT
const express = require('express');
const router = express.Router();
const classeController = require('../controllers/classeController');

router.post('/create', classeController.createClasse); // /api/classes/create
router.get('/findByEleve/:id', classeController.getClasseByEleve);
router.get('/findByEnseignant/:id', classeController.getClassesByEnseignant);
router.delete('/delete/:id', classeController.deleteClasse); // /api/classes/delete/:id

module.exports = router; // ✅ ne pas oublier cette ligne !
