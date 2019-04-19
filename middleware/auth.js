const config = require('config');
const jwt = require('jsonwebtoken');

// the purpose of this middleware is to get the token sent from react or postman 

function auth(req, res, next) {         // next to move on to the next middleware 
  const token = req.header('x-auth-token');  // header value we want to check for token

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;