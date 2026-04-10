// file: routes/livres.js

const express = require("express");
const router = express.Router();
const { auteurs } = require("./auteurs");

let livres = [];
let nextId = 1;

// GET all + pagination
router.get("/", (req, res) => {
  const result = livres.map(l => ({
    ...l,
    auteurNom: auteurs.find(a => a.id === l.auteurId)?.nom
  }));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length || 1;
  const start = (page - 1) * limit;

  res.json(result.slice(start, start + limit));
});

// GET one
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const livre = livres.find(l => l.id === id);

  if (!livre) {
    return res.status(404).json({ erreur: "Livre non trouvé" });
  }

  const auteur = auteurs.find(a => a.id === livre.auteurId);

  res.json({
    ...livre,
    auteurNom: auteur?.nom
  });
});

// POST
router.post("/", (req, res) => {
  const { titre, auteurId, annee } = req.body;

  if (!titre || !auteurId) {
    return res.status(400).json({ erreur: "Titre et auteurId requis" });
  }

  const auteur = auteurs.find(a => a.id === auteurId);
  if (!auteur) {
    return res.status(409).json({ erreur: "Auteur inexistant" });
  }

  const livre = {
    id: nextId++,
    titre,
    auteurId,
    annee,
    disponible: true
  };

  livres.push(livre);

  res.status(201).json(livre);
});

// PUT
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = livres.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: "Livre non trouvé" });
  }

  livres[index] = {
    ...livres[index],
    ...req.body,
    id: livres[index].id // keep id
  };

  res.json(livres[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = livres.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: "Livre non trouvé" });
  }

  livres.splice(index, 1);

  res.status(204).send();
});

// GET livres by auteur
router.get("/auteur/:id", (req, res) => {
  const auteurId = parseInt(req.params.id);

  const result = livres.filter(l => l.auteurId === auteurId);

  res.json(result);
});

// 🔥 VERY IMPORTANT EXPORT
module.exports = { router, livres };