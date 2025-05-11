const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

router.get('/findelevebyid/:id', eleveController.getEleveById);

module.exports = router;
