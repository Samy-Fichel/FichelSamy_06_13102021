const express = require('express');
const router = express.Router();
const Thing = require('../models/saucemdl');

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, sauceCtrl.createsauceController);
router.put('/:id', auth, sauceCtrl.modifysauceController);
router.delete('/:id', auth, sauceCtrl.deletesauceController);
router.get('/:id', auth, sauceCtrl.getOnesauceController);
router.get('/', sauceCtrl.getAllSaucesControllers);



/************ START ROUTE POST **********************************************/
/*router.post('/',);*/

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (req.body.password && req.body.password.length > 1) {
    res.status(201).json({
      message: 'Objet créé !',
    });
  } else {
    res.status(400).json('Bad Request')
  }

});

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

router.post('/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});
/************ END ROUTE POST **********************************************/

/************ START ROUTE GET, PUT, DELETE(supprimer) **********************************************/
/*router.put('/:id', );
 
router.delete('/:id', );
 
router.get('/:id', );
 
router.get('/', );*/
/************ END ROUTE GET, PUT **********************************************/

module.exports = router;