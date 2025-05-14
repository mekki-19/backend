const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes'); // Authentification (optionnel si utilisé)

const enseignantRoutes = require('./routes/enseignantRoutes');
const parentRoutes = require('./routes/parentRoutes');
const eleveRoutes = require('./routes/eleveRoutes'); // Routes des élèves
const classeRoutes = require('./routes/classeRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

/*
console.log('✅ authRouter:', typeof authRouter); // doit être "function"
console.log('✅ enseignantRoutes:', typeof enseignantRoutes);
console.log('✅ parentRoutes:', typeof parentRoutes);
console.log('✅ eleveRoutes:', typeof eleveRoutes);
console.log('✅ classeRoutes:', typeof classeRoutes);

*/

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB connection error: ', err));

app.get('/', (req, res) => {
  res.send('🚀 Hello World from the backend!');
});

//  Les routes
app.use('/api/auth', authRouter); // 👈 Authentification
app.use('/api/enseignants', enseignantRoutes); // Routes des enseignants
app.use('/api/parents', parentRoutes); // Routes des parents
app.use('/api/eleves', eleveRoutes); // Routes des élèves
app.use('/api/classes', classeRoutes); // Routes des classes

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
