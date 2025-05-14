const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('Admin', adminSchema);
