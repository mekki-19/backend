const Eleve = require('../models/eleve');
const Parent = require('../models/parent');
const Enseignant = require('../models/enseignant');
const bcrypt = require('bcryptjs');

// 🔹 Créer un élève
exports.createEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Vérification si l'email existe déjà
    const existing = await Eleve.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const eleve = new Eleve({ nom, prenom, email, password: hashedPassword });
    await eleve.save();

    res.status(201).json({
      id: eleve._id,
      nom: eleve.nom,
      prenom: eleve.prenom,
      email: eleve.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création de l'élève", error: err.message });
  }
};

// 🔍 Récupérer un élève par ID
exports.getEleveById = async (req, res) => {
  try {
    const eleve = await Eleve.findById(req.params.id)
      .select('-password')  // Ne pas retourner le mot de passe
      .populate({ path: 'parent', select: 'nom prenom email' })
      .populate({ path: 'enseignant', select: 'nom prenom email' });

    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    res.status(200).json(eleve);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔍 Récupérer tous les élèves (pour l'admin par exemple)
exports.getAllEleves = async (req, res) => {
  try {
    const eleves = await Eleve.find()
      .select('-password')  // Ne pas retourner le mot de passe
      .populate({ path: 'parent', select: 'nom prenom email' })
      .populate({ path: 'enseignant', select: 'nom prenom email' });

    res.status(200).json(eleves);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des élèves", error: err.message });
  }
};

// 🔹 Mise à jour d’un élève
exports.updateEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const updatedData = { nom, prenom, email };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const eleve = await Eleve.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password');
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    res.status(200).json(eleve);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

// 🔹 Suppression d’un élève
exports.deleteEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findByIdAndDelete(req.params.id);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    res.status(200).json({ message: 'Élève supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};

// 🔹 Lier un élève à un parent et un enseignant
exports.linkEleve = async (req, res) => {
  try {
    const { eleveId, parentId, enseignantId } = req.body;

    if (!eleveId || !parentId || !enseignantId) {
      return res.status(400).json({ message: 'Tous les champs (élève, parent, enseignant) sont nécessaires.' });
    }

    const eleve = await Eleve.findById(eleveId);
    if (!eleve) return res.status(404).json({ message: "Élève non trouvé" });

    const parent = await Parent.findById(parentId);
    if (!parent) return res.status(404).json({ message: "Parent non trouvé" });

    const enseignant = await Enseignant.findById(enseignantId);
    if (!enseignant) return res.status(404).json({ message: "Enseignant non trouvé" });

    eleve.parent = parent._id;
    eleve.enseignant = enseignant._id;

    await eleve.save();

    res.status(200).json({ message: "Élève lié avec succès", eleve });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
