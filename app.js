const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes'); 
const authRouter = require('./routes/authRoutes'); // 👈 ajout

const enseignantRoutes = require('./routes/enseignantRoutes');
const parentRoutes = require('./routes/parentRoutes');
const eleveRoutes = require('./routes/eleveRoutes');
const classeRoutes = require('./routes/classeRoutes');

require('dotenv').config();


/*console.log('userRouter', typeof userRouter);
console.log('authRouter', typeof authRouter);
console.log('enseignantRoutes', typeof enseignantRoutes);
console.log('parentRoutes', typeof parentRoutes);
console.log('eleveRoutes', typeof eleveRoutes);
console.log('classeRoutes', typeof classeRoutes);
*/

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB connection error: ', err));

app.get('/', (req, res) => {
  res.send('🚀 Hello World from the backend!');
});

// 👇 Les routes
app.use('/api/users', userRouter); 
app.use('/api/auth', authRouter); // 👈 ajout

app.use('/api/enseignants', enseignantRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/eleves', eleveRoutes);
app.use('/api/classes', classeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
