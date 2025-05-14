const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

router.get('/findparentbyid/:id', parentController.getParentById);
router.get('/getelevesbyparent/:id', parentController.getElevesByParent);
router.post('/createparent', parentController.createParent);

module.exports = router;