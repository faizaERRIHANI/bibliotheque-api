// file: index.js

require("dotenv").config();

const express = require("express");
const app = express();

const livresRoutes = require("./routes/livres");
const { router: auteursRoutes } = require("./routes/auteurs");

const logger = require("./middlewares/logger");
const verifierApiKey = require("./middlewares/auth");

app.use(express.json());
app.use(logger);

// protect POST PUT DELETE
app.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    return verifierApiKey(req, res, next);
  }
  next();
});

app.use("/livres", livresRoutes);
app.use("/auteurs", auteursRoutes);

app.get("/", (req, res) => {
  res.send("API Bibliothèque OK");
});

// 404
app.use((req, res) => {
  res.status(404).json({ erreur: "Route non trouvée" });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ erreur: "Erreur serveur" });
});

app.listen(3000, () => {
  console.log("API sur http://localhost:3000");
});