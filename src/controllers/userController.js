// (Gère les actions liées aux utilisateurs)

// src/controllers/userController.js
const User = require('../models/userModel'); // Assure-toi que le modèle User est bien importé

// Fonction d'inscription
exports.registerUser = async (req, res) => { 
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }
     // Création de l'utilisateur
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès',user: newUser });
} catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur', error });
}
};


