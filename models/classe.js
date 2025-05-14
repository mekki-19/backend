const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enseignant', // ✅ nouveau modèle
    required: true
  },
  eleves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eleve' // ✅ nouveau modèle
  }]
}, { timestamps: true });

module.exports = mongoose.model('Classe', classeSchema);
