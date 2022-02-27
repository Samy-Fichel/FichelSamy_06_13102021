const Sauce = require('../models/saucemdl');
const fs = require('fs'); // fs = file system accéder au différentes opération lié au système de fichier 

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  //console.log('modifySauce');
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  //console.log(sauceObject, 'sauce');
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  /*SauceId = req.params.id //URL 
  UserId = req.body.userId // BODY PAYLOAD
  const sauceLike = req.body.like // body payload*/

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé ! ' }))
          .catch(error => res.status(400).json({ error }));
      }); // unlink pour supprimer un fichier et deuxième argument le callback 
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.sauceid })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllSauces = (req, res, next) => {
  console.log('Je suis une sauce');
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauces = async (req, res, next) => {
  console.log(req.body.like, 'like');
  console.log(req.body.userId, 'UserId');
  console.log(req.params.samy);

  //Si Sauce = null ont renvoie une erreur 404 
  const sauce = await Sauce.findOne({_id: req.params.samy})
  console.log(sauce);
  //mise en place d'un switch case pour le système de like/dislike
  switch (req.body.like) {
    case 1:      
    //mise à jour objet BDD
    if (!sauce.usersLiked.includes(req.body.userId)){
      Sauce.updateOne(
        { _id: req.params.samy },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "like +1" }))
        .catch((error) => res.status(400).json({ error }));
    }
      break;

    case -1: //like = -1 (dislikes = +1)
      //mise à jour objet BDD
      if (!sauce.usersDisliked.includes(req.body.userId)){
      Sauce.updateOne(
        { _id: req.params.samy },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "dislike +1" }))
        .catch((error) => res.status(400).json({ error }));
    }
      break;

    case 0:
      if (sauce.usersLiked.includes(req.body.userId)) {
        //mise à jour objet BDD
        Sauce.updateOne(
          { _id: req.params.samy },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "like 0" }))
          .catch((error) => res.status(400).json({ error }));
      }
    
      //Après un like = -1 mettre un like = 0 (likes = 0)
      if (sauce.usersDisliked.includes(req.body.userId)) {
        //mise à jour objet BDD
        Sauce.updateOne(
          { _id: req.params.samy },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "dislike 0" }))
          .catch((error) => res.status(400).json({ error }));
      }    
      break;
  }

};
