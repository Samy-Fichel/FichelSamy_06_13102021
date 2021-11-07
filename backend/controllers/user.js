const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
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
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};