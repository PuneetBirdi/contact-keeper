const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
   //Get the token from the header
   const token = req.header('x-auth-token');

   //Check if there is no token provided in the header, if there isn't return an error.
   if(!token){
      return res.status(401).json({msg: 'No token, authorization denied.'});
   }


   //if there is a token, then send back the decoded user information from the JWT.
   try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));

      req.user = decoded.user;
      next();
   //if there is a token, but for some reason there's an error, return this error.
   } catch (err) {
      res.status(401).json({msg: 'Token is not valid'});
   }
}