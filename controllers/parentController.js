// controllers/parentController.js
const User = require('../models/user');

exports.getParentById = async (req, res) => {
  try {
    const parent = await User.findById(req.params.id)
      .select('name email role enfants')
      .populate('enfants', 'name email role');
    
    if (!parent || parent.role !== 'parent') {
      return res.status(404).json({ message: 'Parent non trouvé' });
    }

    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getElevesByParent = async (req, res) => {
  try {
    const parent = await User.findById(req.params.id).populate('enfants', 'name email role');

    if (!parent || parent.role !== 'parent') {
      return res.status(404).json({ message: 'Parent non trouvé' });
    }

    res.status(200).json(parent.enfants);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
