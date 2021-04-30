const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
  const jwtSecret = process.env.jwtSecretKey || config.get('jwtSecretKey');

  const token = req.header['x-access-token'];

  if(!token) {
    return res.status(401).json({ msg: 'No token provided, authorization denied!' });
  }

  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
    
  } catch(err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}