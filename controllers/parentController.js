const User = require('../models/user');

exports.getAllParents = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent' }).select('-password');
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
