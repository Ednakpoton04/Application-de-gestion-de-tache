// (Routes pour gérer les tâches) 


const express = require("express");
const Task = require("../models/taskModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Récupérer les tâches de l'utilisateur
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Ajouter une tâche
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Modifier une tâche
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(403).json({ message: "Non autorisé" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Supprimer une tâche
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(403).json({ message: "Non autorisé" });

    await task.deleteOne();
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;


