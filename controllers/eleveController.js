const User = require('../models/user');

exports.getParentEtEnseignant = async (req, res) => {
  try {
    const eleve = await User.findById(req.params.id)
      .populate('parent')
      .populate('enseignant');
    if (!eleve || eleve.role !== 'eleve') {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    res.status(200).json({
      parent: eleve.parent,
      enseignant: eleve.enseignant
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
