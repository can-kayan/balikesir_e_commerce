const jwt=require('jsonwebtoken')
const errorMessages = require('../messageHandling/ErrorHandling');
require('dotenv/config')
const verify = (req,res,next) => {
  try {
    
    const token = req.headers.authorization
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message:errorMessages.authorizationNotValid });
      }
      req.decoded = decoded; 
      next(); 
    });
  } catch (error) {
    return res.send(errorMessages.authorizationNotValid);
    
  }
};
module.exports=verify