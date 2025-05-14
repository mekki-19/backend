const Parent = require('../models/parent');
const Eleve = require('../models/eleve');
const bcrypt = require('bcryptjs');

// ➕ Créer un parent
// ➕ Créer un parent
exports.createParent = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "L'email et le mot de passe sont nécessaires" });
    }

    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const parent = new Parent({ nom, prenom, email, password: hashedPassword });
    await parent.save();

    res.status(201).json({
      id: parent._id,
      nom: parent.nom,
      prenom: parent.prenom,
      email: parent.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du parent", error: err.message });
  }
};

// 🔍 Trouver un parent par ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent non trouvé" });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔍 Trouver les élèves liés à un parent
exports.getElevesByParent = async (req, res) => {
  try {
    const eleves = await Eleve.find({ parent: req.params.id }).populate('parent', 'nom prenom');
    if (eleves.length === 0) return res.status(404).json({ message: "Aucun élève trouvé pour ce parent" });
    res.status(200).json(eleves);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
