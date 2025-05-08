const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['parent', 'Enseignant', 'admin', 'eleve'], // attention à la casse exacte ici
    required: true,
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  eleves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
