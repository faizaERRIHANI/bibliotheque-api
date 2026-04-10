// file: index.js

const express = require("express");
require("dotenv").config();

// 🔥 FIX HERE
const { router: livresRoutes } = require("./routes/livres");
const { router: auteursRoutes } = require("./routes/auteurs");

const logger = require("./middlewares/logger");
const verifierApiKey = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(logger);

// 🔐 Auth for livres
app.use(
  "/livres",
  (req, res, next) => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      return verifierApiKey(req, res, next);
    }
    next();
  },
  livresRoutes
);

// 🔐 Auth for auteurs (only POST)
app.use(
  "/auteurs",
  (req, res, next) => {
    if (["POST"].includes(req.method)) {
      return verifierApiKey(req, res, next);
    }
    next();
  },
  auteursRoutes
);

// ❗ Route not found
app.use((req, res) => {
  res.status(404).json({ erreur: "Route non trouvée" });
});

// ✅ GLOBAL ERROR HANDLER (IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err.stack); // why: debug serveur
  res.status(err.status || 500).json({
    erreur: err.message || "Erreur interne du serveur",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API sur http://localhost:${PORT}`);
});