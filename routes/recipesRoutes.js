const express = require('express');
const router = express.Router();

// import controller
const recipesController = require('./../controllers/recipesController');

// GET /recipes
router.get('/recipes', recipesController.getRecipes);

// POST /recipe
router.post('/recipe', recipesController.postRecipe);

// GET /recipe/:recipeId
router.get('/recipe/:recipeId', recipesController.getRecipe);

// DELETE /recipe/:recipeId
router.delete('/recipe/:recipeId', recipesController.deleteRecipe);

module.exports = router;
