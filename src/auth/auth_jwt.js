
//auth_jwt


let jwt = require('jsonwebtoken');
let config = require('../config');

function verify_token(req, res, next) {

  // get token from header
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  
  if(!token)
  {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // Remove Bearer from string
  if (token.startsWith('Bearer ')) {

    token = token.slice(7, token.length);

  }


  if (token) 
  {
    jwt.verify(token, config.secret_code, (err, decoded) => {
      
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'failed token authentification.'
        });
      } 
      
      
      req.userId = decoded.sub;
      next();
    
    });

    
  } 
  
};

module.exports = verify_token;
