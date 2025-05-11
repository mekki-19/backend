const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController');

router.get('/getelevesbyenseignant/:id', enseignantController.getAllEleves);

router.get('/findeleve/:enseignantId/:eleveId', enseignantController.getEleveById);

router.get('/getclassesbyenseignant/:enseignantId', enseignantController.getClasses);

module.exports = router;
