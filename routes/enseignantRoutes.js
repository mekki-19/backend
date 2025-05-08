const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController');

// Récupérer les élèves d’un enseignant
router.get('/:id/eleves', enseignantController.getAllEleves);

//  récupérer un élève spécifique
router.get('/:enseignantId/eleves/:eleveId', enseignantController.getEleveById);

// récupérer les classes d’un enseignant
router.get('/:enseignantId/classes', enseignantController.getClasses);

module.exports = router;
