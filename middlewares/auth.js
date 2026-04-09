// file: middlewares/auth.js

function verifierApiKey(req, res, next) {
  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ erreur: "Clé API manquante ou invalide" });
  }

  next();
}

module.exports = verifierApiKey;