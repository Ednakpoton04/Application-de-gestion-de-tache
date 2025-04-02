// (Gère les actions liées aux tâches)
const Task = require('../models/taskModel');

// Récupérer les tâches d'un utilisateur
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      userId: req.userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
