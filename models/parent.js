const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // << ici on garde "password"
  enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eleve' }],
  role: { type: String, enum: ['parent'], default: 'parent' }
});

const Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;
