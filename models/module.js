const moduleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant' },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' },
});

module.exports = mongoose.model('Module', moduleSchema);
