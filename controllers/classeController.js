// controllers/classeController.js
const Classe = require('../models/classe');
const Eleve = require('../models/eleve');
const Enseignant = require('../models/enseignant');

// 🔍 Trouver la classe d’un élève
exports.getClasseByEleve = async (req, res) => {
  try {
    const classe = await Classe.findOne({ eleves: req.params.id })
      .populate('eleves', 'nom prenom email')
      .populate('enseignant', 'nom prenom email');

    if (!classe) return res.status(404).json({ message: 'Classe non trouvée' });
    res.status(200).json(classe);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🔍 Trouver les classes d’un enseignant
exports.getClassesByEnseignant = async (req, res) => {
  try {
    const classes = await Classe.find({ enseignant: req.params.id })
      .populate('eleves', 'nom prenom email')
      .populate('enseignant', 'nom prenom email');

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Créer une classe
exports.createClasse = async (req, res) => {
  try {
    const { nom, enseignant, eleves } = req.body;

    if (!nom || !enseignant || !eleves) {
      return res.status(400).json({ message: 'Nom de classe, enseignant et élèves sont nécessaires.' });
    }

    const existing = await Classe.findOne({ nom: nom.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Une classe avec ce nom existe déjà.' });
    }

    const newClasse = new Classe({ nom: nom.trim(), enseignant, eleves });
    await newClasse.save();

    res.status(201).json(newClasse);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};


// ❌ Supprimer une classe
exports.deleteClasse = async (req, res) => {
  try {
    const deleted = await Classe.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }
    res.status(200).json({ message: 'Classe supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};
