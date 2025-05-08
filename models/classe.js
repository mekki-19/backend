const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eleves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Classe', classeSchema);
