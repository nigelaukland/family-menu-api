const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AUTHKEY = require('./../config').auth.tokenKey;

///////////////// end setup of email

exports.postLogin = (req, res, next) => {
  // extract post body
  const email = req.body.email;
  const password = req.body.password;
  let targetUser;
  // find the user in the user collection
  User.findOne({ email: email })
    .then(userDoc => {
      // user found
      if (userDoc) {
        // check password
        console.log(`User ${userDoc.email} found`)
        targetUser = userDoc;
        return bcrypt.compare(password, userDoc.password);
      }
      else {
        // password does not match or user not found
        console.log('User not found')
      //   res.status(401).json({ message: 'User not authenticated' });
        return next();
      }
    })
    .then(result => {
      if (result === true) {
        // password matches - authenticate the user and provide them a token
        const token = jwt.sign(
          { email: targetUser.email, userId: targetUser._id.toString() },
          AUTHKEY, { expiresIn: '1h' }
        );
        res.status(200).json({
          message: 'User authenticated',
          token: token,
          userId: targetUser._id.toString()
        });

        next();
      } else {
        // password does not match or user not found
        console.log(`User password incorrect`);
        res.status(401).json({ message: 'User not authenticated' });
      }
    })
    .catch(err => {
      // if it doesn't have a status code, give it a default!
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        res
          .status(200)
          .json({ message: 'User already exists!', userId: userDoc._id });
        return next();
      }
      const newUser = new User({
        email: email,
        password: bcrypt.hashSync(password, 12)
      });
      console.log(newUser);
      return newUser
        .save()
        .then(result => {
          console.log(`Created user ${newUser.email}`);
          const token = jwt.sign(
            { email: newUser.email, userId: result._id.toString() },
            AUTHKEY, { expiresIn: '3600' }
          );
          res
            .status(200)
            .json({ message: 'User created!', token: token, userId: result._id });
        })
        .catch(err => {
          // if it doesn't have a status code, give it a default!
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      // if it doesn't have a status code, give it a default!
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.postLogout = (req, res, next) => {
//   return req.session.destroy(() => {
//     console.log(`User logged out`);
//     res.redirect('/');
//   });
// };
