const Sauce = require('../models/saucemdl');

exports.createSauce = (req, res, next) => { //createSauces
  // Vérifier que le req.body.sauce est existant si non retourne une erreur 
  const newSauce = new Sauce(JSON.parse (req.body.sauce));
  newSauce.save(function (error) {
    if (error) { 
      res.status(500).json({ error })
    }else{
      res.status(201).json({ message: 'Objet enregistré !' })
    }
    
  });

};

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé ! ' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllSauces = (req, res, next) => {
  console.log('Je suis une sauce');
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};





