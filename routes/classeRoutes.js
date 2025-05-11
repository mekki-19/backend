// routes/classeRoutes.js ✅ CORRECT
const express = require('express');
const router = express.Router();
const classeController = require('../controllers/classeController');

router.post('/create', classeController.createClasse); // /api/classes/create
router.get('/find/eleve/:id', classeController.getClasseByEleve);
router.get('/find/enseignant/:id', classeController.getClassesByEnseignant);
router.delete('/delete/:id', classeController.deleteClasse); // /api/classes/delete/:id

module.exports = router; // ✅ ne pas oublier cette ligne !
