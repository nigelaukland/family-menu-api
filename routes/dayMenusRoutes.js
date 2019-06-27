const express = require('express');
const router = express.Router();
const dayMenuController = require('./../controllers/dayMenusController');

// POST dayMenu
router.post('/dayMenu', dayMenuController.postDayMenu);

module.exports = router;
