const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Eleve = require('../models/eleve');
const Parent = require('../models/parent');
const Enseignant = require('../models/enseignant');
const Admin = require('../models/admin');

const models = {
  eleve: Eleve,
  parent: Parent,
  enseignant: Enseignant,
  admin: Admin,
};

// 🔐 Inscription
// 🔐 Inscription
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, mot de passe et rôle sont requis.' });
    }

    const cleanRole = role?.trim()?.toLowerCase();
    const Model = models[cleanRole];

    if (!Model) return res.status(400).json({ message: 'Rôle invalide.' });

    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Cet utilisateur existe déjà' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({ nom, prenom, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: cleanRole },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: cleanRole,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🔐 Connexion
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const cleanRole = role?.trim()?.toLowerCase();
    const Model = models[cleanRole];

    if (!Model) return res.status(400).json({ message: 'Rôle invalide.' });

    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: cleanRole },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: cleanRole,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
