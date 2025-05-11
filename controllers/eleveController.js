// controllers/eleveController.js
const User = require('../models/user');

exports.getEleveById = async (req, res) => {
  try {
    const eleve = await User.findById(req.params.id)
      .select('name email role parent enseignant')
      .populate('parent', 'name email role')
      .populate('enseignant', 'name email role');

    if (!eleve || eleve.role !== 'eleve') {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    res.status(200).json(eleve);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
