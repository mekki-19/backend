const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eleveSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },       // 🔥 Obligatoire
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant' }, // 🔥 Obligatoire
  // autres champs possibles
});

const Eleve = mongoose.model('Eleve', eleveSchema);
module.exports = Eleve;
