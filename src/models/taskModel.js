//  (Modèle pour les tâches) 

const mongoose = require('mongoose');

// Définition du schéma de la tâche
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Création du modèle
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
