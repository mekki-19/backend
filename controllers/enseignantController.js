const User = require('../models/user');
const Classe = require('../models/classe'); // tu dois créer ce modèle

exports.getAllEleves = async (req, res) => {
  try {
    const enseignantId = req.params.id;
    const enseignant = await User.findById(enseignantId)
      .populate({
        path: 'eleves',
        select: 'name email role parent enseignant' // 👉 garde que les champs utiles
      });

    if (!enseignant || enseignant.role !== 'Enseignant') {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    res.status(200).json(enseignant.eleves);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};


// 1️⃣ Récupérer un élève précis par son ID (vérifie que c'est bien l'élève de l’enseignant)
exports.getEleveById = async (req, res) => {
  const { enseignantId, eleveId } = req.params;
  try {
    const enseignant = await User.findById(enseignantId);
    if (!enseignant || enseignant.role !== 'Enseignant') {
      return res.status(403).json({ message: 'Enseignant non autorisé' });
    }

    const eleve = await User.findOne({ _id: eleveId, enseignant: enseignantId })
      .select('name email role parent enseignant'); // 👉 filtre la réponse

    if (!eleve) return res.status(404).json({ message: 'Élève non trouvé ou non associé à cet enseignant' });

    res.status(200).json(eleve);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


// 2️⃣ Récupérer les classes assignées à cet enseignant
exports.getClasses = async (req, res) => {
  const { enseignantId } = req.params;
  try {
    const classes = await Classe.find({ enseignant: enseignantId })
      .select('nom enseignant eleves') // 👈 sélectionne ce qui est utile
      .populate({
        path: 'eleves',
        select: 'name email role parent enseignant'
      });

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des classes', error: err.message });
  }
};

