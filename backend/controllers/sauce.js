const sauceController = require('../models/saucemdl');

exports.createsauceController = (req, res, next) => { //createSauces

  res.status(201).json({ message: 'Objet enregistré !' })
  
};

exports.modifysauceController = (req, res, next) => {
  sauceController.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletesauceController = (req, res, next) => {
  sauceController.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé ! ' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnesauceController = (req, res, next) => {
  sauceController.findOne({ _id: req.params.id })
    .then(sauceController => res.status(200).json(sauceController))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllSaucesControllers = (req, res, next) => {
  console.log('Je suis une sauce');
  sauceController.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};





