const jwt = require('jsonwebtoken');

const AUTHKEY = require('./../config').auth.tokenKey;

isAuth = (req, res, next) => {
  
  console.log('isAuth route');
  // define the decodedToken here so it has block scope
  let decodedToken;
  try {
    // expecting an Authorization header of BEARER 
    const token = req.get('Authorization').split(' ')[1];
    decodedToken = jwt.verify(token, AUTHKEY);
    // TODO: catch an expired token
    console.log(`decodedToken ${decodedToken}`);
  } catch (err) { 
    res.status(401).json({ message: 'User not authorised' });
    console.log('Error in decoding');
    console.log(err);
    return;
  }
  if (!decodedToken) {
    console.log('decodedToken does not exist');
    res.status(401).json({ message: 'User not authorised' });
    return;
  }
  // add the decoded userId to the request, to then be passed on
  req.userId = decodedToken.userId;
  console.log(`req.userId ${req.userId}`);
  next();
};

module.exports = isAuth;
