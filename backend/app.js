/********************************Start CONFIGURATIONS NODE JS , EXPRESS , MONGOOSE , bodyParser****************************/
const express = require('express'); //cherche un module externe
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

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
/********************************End CONFIGURATIONS NODE JS , EXPRESS , MONGOOSE , bodyParser****************************/
//app.use('/api/auth/login', sauceRoutes);
//app.use('/api/auth/signup', sauceRoutes);
app.use('/api/auth/login', userRoutes);
app.use('/api/auth/signup', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/api/sauces/:id', sauceRoutes);
app.use('/api/sauces/:id/like', sauceRoutes);



module.exports = app;
