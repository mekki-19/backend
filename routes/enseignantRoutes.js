const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController'); 

router.get('/getallenseignants', enseignantController.getAllEnseignants);
router.get('/getenseignantbyid/:id', enseignantController.getEnseignantById);
router.post('/createenseignant', enseignantController.createEnseignant);
router.put('/updateenseignant/:id', enseignantController.updateEnseignant);
router.delete('/deleteenseignant/:id', enseignantController.deleteEnseignant);

module.exports = router;
