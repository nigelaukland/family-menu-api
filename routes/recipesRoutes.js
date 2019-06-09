const express = require('express');
const router = express.Router();

// import controller
const recipesController = require('./../controllers/recipesController');

// GET /recipes
router.get('/recipes', recipesController.getRecipes);

// POST /recipe/add
router.post('/recipe/add', recipesController.postAddRecipe);

// DELETE /recipe/delete/:recipeId
router.delete('/recipe/delete/:recipeId', recipesController.postDeleteRecipe);

module.exports = router;
