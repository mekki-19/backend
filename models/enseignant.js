const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  // Ajouter d'autres champs si nécessaire
}, {
  timestamps: true
});

module.exports = mongoose.model('Enseignant', enseignantSchema);
