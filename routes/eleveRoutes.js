const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController'); // Assure-toi que ce fichier existe et que les fonctions sont bien exportées.

// 🔹 Routes principales
router.get('/getalleleves', eleveController.getAllEleves);
router.get('/getelevebyid/:id', eleveController.getEleveById);
router.post('/createeleve', eleveController.createEleve); // Assure-toi que tu utilises la bonne fonction (createEleve)
router.put('/updateeleve/:id', eleveController.updateEleve); // Assure-toi que tu utilises la bonne fonction (updateEleve)
router.delete('/deleteeleve/:id', eleveController.deleteEleve); // Assure-toi que tu utilises la bonne fonction (deleteEleve)

// 🔹 Route pour lier un élève à un parent et un enseignant
router.post('/linkeleve', eleveController.linkEleve); // Assure-toi que tu utilises la bonne fonction (linkEleve)

module.exports = router;
