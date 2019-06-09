// config
const config = require('./config');

// express & packages
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();

// load routes
const recipesRoutes = require('./routes/recipesRoutes');

// configure file storage for multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

// allow CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
  next();
});

// register middlewares
// parse incoming body data
app.use(bodyparser.json());

/// deal with image upload and processing on sepcific routes
//app.post("/recipe", multer({ storage: multerStorage }).single('imagePath'));
app.post(["/recipe/add"], multer({ storage: multerStorage }).single('imagePath'), (req, res, next) => { 
  
  // add the filenames to the body
  req.body.tinyImagePath = path.join(req.file.destination, `tiny_${req.file.filename}`);
  req.body.mediumImagePath = path.join(req.file.destination, `medium_${req.file.filename}`);
  
  const inputImage = sharp(req.file.path);
  // create tiny 80px image
  inputImage
    .clone()
    .resize( 80, 80, { fit: 'contain', position: 'left top' })
    .toFile(path.join(req.file.destination, `tiny_${req.file.filename}`))
    .then(() => {
    })
    .catch((err) => {
      console.log(err)
      throw err
    });
  // create medium 300px image
  inputImage
    .clone()
    .resize( 300, 300, { fit: 'contain', position: 'left top' })
    .toFile(path.join(req.file.destination, `medium_${req.file.filename}`))
    .then(() => {
    })
    .catch((err) => {
      console.log(err)
      throw err
    });
  next();
});

// register routes
app.use(recipesRoutes);

// establish database connection
mongoose
  .connect(config.mongoUrl)
  .then(result => {
    // listen on http port
    app.listen(config.connection.port);
    // TODO: should probably set up a secure port as well
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
