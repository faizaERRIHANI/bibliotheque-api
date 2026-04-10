// file: routes/auteurs.js

const express = require("express");
const router = express.Router();

// ❌ REMOVE direct import of livres
// const { livres } = require("./livres");

let auteurs = [
  { id: 1, nom: "Antoine de Saint-Exupéry" },
  { id: 2, nom: "George Orwell" }
];

let nextAuteurId = 3;

// GET all auteurs
router.get("/", (req, res) => {
  res.json(auteurs);
});

// GET one auteur
router.get("/:id", (req, res) => {
  const auteur = auteurs.find(a => a.id === parseInt(req.params.id));

  if (!auteur) {
    return res.status(404).json({ erreur: "Auteur non trouvé" });
  }

  res.json(auteur);
});

// POST auteur
router.post("/", (req, res) => {
  const { nom } = req.body;

  if (!nom) {
    return res.status(400).json({ erreur: "Nom requis" });
  }

  const auteur = { id: nextAuteurId++, nom };
  auteurs.push(auteur);

  res.status(201).json(auteur);
});

// ✅ SAFE VERSION (no circular dependency)
router.get("/:id/livres", (req, res) => {
  const auteurId = parseInt(req.params.id);

  const auteur = auteurs.find(a => a.id === auteurId);
  if (!auteur) {
    return res.status(404).json({ erreur: "Auteur non trouvé" });
  }

  // 🔥 import inside route (lazy require → avoids circular bug)
  const { livres } = require("./livres");

  const result = livres.filter(l => l.auteurId === auteurId);

  res.json(result);
});

module.exports = { router, auteurs };