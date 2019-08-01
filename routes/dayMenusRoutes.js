const express = require('express');
const router = express.Router();
const dayMenuController = require('./../controllers/dayMenusController');
const isAuth = require('./../middleware/is-auth');

// POST dayMenu
router.post('/dayMenu', isAuth, dayMenuController.postDayMenu);

module.exports = router;
