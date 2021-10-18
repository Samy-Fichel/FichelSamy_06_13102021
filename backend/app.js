const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://samy:Bonjour@cluster0.z0zhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/auth/signup',(req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
}); 

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !'});
  next();
});

app.use((req, res) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;