const Classe = require('../models/classe');

// 🔍 Trouver la classe d’un élève
exports.getClasseByEleve = async (req, res) => {
  try {
    const classe = await Classe.findOne({ eleves: req.params.id })
      .select('nom enseignant eleves')
      .populate({
        path: 'eleves',
        select: 'name email role parent enseignant'
      })
      .populate({
        path: 'enseignant',
        select: 'name email role'
      });

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
      .select('nom enseignant eleves')
      .populate({
        path: 'eleves',
        select: 'name email role parent enseignant'
      });

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Créer une classe (avec contrôle d’unicité)
exports.createClasse = async (req, res) => {
  try {
    const { nom, enseignant, eleves } = req.body;

    const existing = await Classe.findOne({ nom: nom.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Une classe avec ce nom existe déjà.' });
    }

    const newClasse = await Classe.create({ nom: nom.trim(), enseignant, eleves });
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
