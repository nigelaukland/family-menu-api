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
const menusRoutes = require('./routes/menusRoutes');
const dayMenusRoutes = require('./routes/dayMenusRoutes');

// configure file storage for multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // this returns the location
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    // this returns the filename (I used datetimestamp)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

// allow CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
  next();
});

// register middlewares
// static route for serving images
app.use('/images', express.static(path.join(__dirname, 'images')));

// parse incoming body data
app.use(bodyparser.json());

/// deal with image upload and processing on sepcific routes
app.post(["/recipe"], multer({ storage: multerStorage }).single('imagePath'), (req, res, next) => { 
  
  // add the filenames to the body
  req.body.imagePath = path.join(req.file.destination, `${req.file.filename}`);
  req.body.tinyImagePath = path.join(req.file.destination, `tiny_${req.file.filename}`);
  req.body.mediumImagePath = path.join(req.file.destination, `medium_${req.file.filename}`);
  
  const inputImage = sharp(req.file.path);

  // tiny image
  const tinyPromise = inputImage
  .clone()
  .resize(80, 80, { fit: 'cover', position: 'centre', background: {r:255,g:255,b:255,alpha:0} })
  // .resize({ width: 80, position: 'left top', background: {r:255,g:255,b:255,alpha:0} })
  .toFile(path.join(req.file.destination, `tiny_${req.file.filename}`))
  .catch((err) => {
    console.log(err)
    throw err
  });

  // medium image
  const mediumPromise = inputImage
  .clone()
  .resize( 300, 300, { fit: 'cover', position: 'centre', background: {r:255,g:255,b:255,alpha:0} })
  .toFile(path.join(req.file.destination, `medium_${req.file.filename}`))
  .catch((err) => {
    console.log(err)
      throw err
    });

  // Wait until all image processing has been carried out before returning the URLs in the response  
  Promise.all([ tinyPromise, mediumPromise ], next());

});

// register routes
app.use(recipesRoutes);
app.use(menusRoutes);
app.use(dayMenusRoutes);

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
