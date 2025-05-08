// controllers/classeController.js
const Classe = require('../models/classe');

exports.getClasseByEleve = async (req, res) => {
  try {
    const classe = await Classe.findOne({ eleves: req.params.id }).populate('enseignant');
    if (!classe) return res.status(404).json({ message: "Classe non trouvée pour cet élève" });
    res.status(200).json(classe);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.getClassesByEnseignant = async (req, res) => {
  try {
    const classes = await Classe.find({ enseignant: req.params.id }).populate('eleves');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.createClasse = async (req, res) => {
  try {
    const { nom, enseignant, eleves } = req.body;
    const newClasse = await Classe.create({ nom, enseignant, eleves });
    res.status(201).json(newClasse);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err.message });
  }
};
