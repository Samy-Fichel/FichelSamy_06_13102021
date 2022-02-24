/********************************Start CONFIGURATIONS NODE JS , EXPRESS , MONGOOSE , bodyParser****************************/
const express = require('express'); //cherche un module externe
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("./middleware/rate-limit");
//Importaton du package pour utiliser les variables d'environnement .env
const dotenv = require("dotenv");
const result = dotenv.config();


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/
app.use(rateLimit);
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


/********************************End CONFIGURATIONS NODE JS , EXPRESS , MONGOOSE , bodyParser****************************/
app.use('/api/auth/', userRoutes);
app.use('/api/sauces/', sauceRoutes);


module.exports = app;