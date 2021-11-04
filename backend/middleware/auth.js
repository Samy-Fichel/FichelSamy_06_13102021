const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {

   } catch (error) {
       res.status(401).json({ error: error })
   }
}