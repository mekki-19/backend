const User = require('../models/user');
const bcrypt = require('bcryptjs');

// 🟢 Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    const { password: _, ...userSansPassword } = user.toObject(); // Exclure le mot de passe de la réponse

    res.status(201).json(userSansPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🟢 Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};

// 🟢 Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Format ID invalide.' });
    }

    const updatedData = { name, email };
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

// 🟢 Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};

// 🟢 Lier un élève à un parent et un enseignant
exports.linkEleveToParentAndEnseignant = async (req, res) => {
  const { eleveId, parentId, enseignantId } = req.body;

  try {
    const eleve = await User.findById(eleveId);
    const parent = await User.findById(parentId);
    const enseignant = await User.findById(enseignantId);

    if (!eleve || eleve.role !== 'eleve') {
      return res.status(400).json({ message: 'Élève invalide ou introuvable' });
    }
    if (!parent || parent.role !== 'parent') {
      return res.status(400).json({ message: 'Parent invalide ou introuvable' });
    }
    if (!enseignant || enseignant.role !== 'Enseignant') {
      return res.status(400).json({ message: 'Enseignant invalide ou introuvable' });
    }

    eleve.parent = parent._id;
    eleve.enseignant = enseignant._id;
    await eleve.save();

    if (!parent.enfants.includes(eleve._id)) {
      parent.enfants.push(eleve._id);
      await parent.save();
    }

    if (!enseignant.eleves.includes(eleve._id)) {
      enseignant.eleves.push(eleve._id);
      await enseignant.save();
    }

    res.status(200).json({ message: 'Élève lié avec succès au parent et à l’enseignant.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’association', error: err.message });
  }
};
