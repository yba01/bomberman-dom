const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir les fichiers statiques depuis le dossier "src"
app.use(express.static(path.join(__dirname, 'src')));

// Route pour servir le fichier HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
