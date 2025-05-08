const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 🟢 Routes de gestion des utilisateurs
router.post('/register', userController.registerUser); // 👈 ajoute cette ligne
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// 🟢 Lier élève à parent et enseignant
router.post('/link', userController.linkEleveToParentAndEnseignant);

module.exports = router;
