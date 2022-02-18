const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//import crypto JS pour chiffrement de l'email
const cryptojs = require("crypto-js");
require('dotenv').config();

exports.signup = (req, res, next) => {
    //const hashedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();
    bcrypt.hash(req.body.password, 10)         //Fonction pour cryptée un MDP 
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save() //enregister un utilsiateur dans la BDD
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log("Je suis dans la requête login");
    //const hashedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisiateur non trouvé ! ' });
            }
            bcrypt.compare(req.body.password, user.password)  // compare le MDP qui et envoyé avec la requete 
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect ! ' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(  // données à encoder dans ce token (payload)
                            { userid: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' } // le token expire au bout de 24h au dessus il ne sera plus considéré comme valable
                        )
                    });
                })
                .catch(error => {
                  console.log("erreur bcrypt", error);
                  res.status(500).json({ error });
                }); 
        })
        .catch(error => {
            console.log("erreur finduser", error);
            res.status(500).json({ error });
          }); 
};