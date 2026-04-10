# 📚 Bibliothèque API — Express.js

API REST développée avec Node.js et Express pour gérer une bibliothèque (livres & auteurs).

---

## 📁 Structure du projet
```

bibliotheque-api/
├── index.js
├── package.json
├── routes/
│ ├── livres.js
│ └── auteurs.js
├── middlewares/
│ ├── logger.js
│ └── auth.js
├── .env
├── .gitignore
└── api.http
```

---

## ⚙️ Installation

```bash
git clone https://github.com/faizaERRIHANI/bibliotheque-api.git
cd bibliotheque-api
npm install
🔑 Configuration

Créer un fichier .env :

API_KEY=monSecretDev123
▶️ Lancer le serveur
node index.js

API disponible sur :
http://localhost:3000

📘 Endpoints
Livres
GET /livres
GET /livres/:id
POST /livres 🔐
PUT /livres/:id 🔐
DELETE /livres/:id 🔐
GET /livres/auteur/:id
Auteurs
GET /auteurs
GET /auteurs/:id
POST /auteurs 🔐
GET /auteurs/:id/livres
🔐 Authentification

Ajouter dans les headers :

X-API-Key: monSecretDev123
🧠 Fonctionnalités
API REST complète
Middleware logger
Authentification API Key
Relation auteurs ↔ livres
Pagination
Gestion des erreurs

## 👩‍💻 Auteure
**Faiza Errihani**
- GitHub : [@faizaERRIHANI](https://github.com/faizaERRIHANI)
- Email : fa_errihani@etu.enset-media.ac.ma
- École : ENSET 
