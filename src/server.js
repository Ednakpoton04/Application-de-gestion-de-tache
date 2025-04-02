// (Fichier principal qui lance le serveur)


// Importer les modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');  
const taskRoutes = require('./routes/taskRoutes');  
const authMiddleware = require('./middlewares/authMiddleware');  
const cors = require('cors');  

// Charger les variables d'environnement
require('dotenv').config();

// Initialiser l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Autoriser les requêtes venant d'autres origines (CORS)
app.use(cors());

// Connexion à la base de données MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(err => console.error("Erreur de connexion à la base de données:", err));

// Définir les routes de l'application
app.use('/api/users', userRoutes);  
app.use('/api/tasks', authMiddleware, taskRoutes);  

// Route par défaut
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
