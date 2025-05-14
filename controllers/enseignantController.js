const Enseignant = require('../models/enseignant');
const Eleve = require('../models/eleve');
const Classe = require('../models/classe');

// ➕ Créer un enseignant
exports.createEnseignant = async (req, res) => {
  try {
    const enseignant = new Enseignant(req.body);
    await enseignant.save();
    res.status(201).json(enseignant);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err.message });
  }
};

// 🔍 Obtenir tous les enseignants
exports.getAllEnseignants = async (req, res) => {
  try {
    const enseignants = await Enseignant.find();
    res.status(200).json(enseignants);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des enseignants", error: err.message });
  }
};

// 🔍 Obtenir un enseignant par ID
exports.getEnseignantById = async (req, res) => {
  try {
    const enseignant = await Enseignant.findById(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ message: "Enseignant non trouvé" });
    }
    res.status(200).json(enseignant);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔄 Mettre à jour un enseignant
exports.updateEnseignant = async (req, res) => {
  try {
    const updatedEnseignant = await Enseignant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEnseignant) {
      return res.status(404).json({ message: "Enseignant non trouvé" });
    }
    res.status(200).json(updatedEnseignant);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

// 🗑️ Supprimer un enseignant
exports.deleteEnseignant = async (req, res) => {
  try {
    const deletedEnseignant = await Enseignant.findByIdAndDelete(req.params.id);
    if (!deletedEnseignant) {
      return res.status(404).json({ message: "Enseignant non trouvé" });
    }
    res.status(200).json({ message: "Enseignant supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};

// 🔍 Obtenir les élèves liés à un enseignant
exports.getElevesByEnseignant = async (req, res) => {
  try {
    const eleves = await Eleve.find({ enseignant: req.params.id });
    res.status(200).json(eleves);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔍 Obtenir les classes d’un enseignant
exports.getClasses = async (req, res) => {
  try {
    const classes = await Classe.find({ enseignant: req.params.id });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
