// file: routes/auteurs.js

const express = require("express");
const router = express.Router();

let auteurs = [
  { id: 1, nom: "Antoine de Saint-Exupéry" },
  { id: 2, nom: "George Orwell" }
];

let nextAuteurId = 3;

// GET all
router.get("/", (req, res) => {
  res.json(auteurs);
});

// GET one
router.get("/:id", (req, res) => {
  const auteur = auteurs.find(a => a.id === parseInt(req.params.id));

  if (!auteur) return res.status(404).json({ erreur: "Auteur non trouvé" });

  res.json(auteur);
});

// POST
router.post("/", (req, res) => {
  const { nom } = req.body;

  if (!nom) return res.status(400).json({ erreur: "Nom requis" });

  const auteur = { id: nextAuteurId++, nom };
  auteurs.push(auteur);

  res.status(201).json(auteur);
});

module.exports = { router, auteurs };