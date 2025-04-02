// (Routes pour gérer les utilisateurs) 


// src/routes/userRoutes.js
// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController'); // Importer la fonction registerUser

// Route pour l'inscription de l'utilisateur
router.post('/register', registerUser);  // Enregistre un nouvel utilisateur

module.exports = router;

