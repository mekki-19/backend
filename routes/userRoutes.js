const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createuser', userController.registerUser);

router.get('/getallusers', userController.getAllUsers);

router.get('/getuserbyid/:id', userController.getUserById);

router.put('/updateuser/:id', userController.updateUser);

router.delete('/deleteuser/:id', userController.deleteUser);

router.post('/linkeleve', userController.linkEleveToParentAndEnseignant);

module.exports = router;
