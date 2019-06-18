// Load the recipe model
const Recipe = require('./../models/recipe');

exports.getRecipes = (req, res, next) => {
  Recipe.find()
    .then(recipesData => {
      res.status(200).json(recipesData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postRecipe = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const imagePath = req.body.imagePath;
  const tinyImagePath = req.body.tinyImagePath;
  const mediumImagePath = req.body.mediumImagePath;

  const recipe = new Recipe({
    name: name,
    description: description,
    ingredients: ingredients,
    imagePath: `/${imagePath}`,
    tinyImagePath: `/${tinyImagePath}`,
    mediumImagePath: `/${mediumImagePath}`
  });
  recipe
    .save()
    .then(recipeData => {
      res.status(200).json({
        message: 'Recipe added',
        errors: '',
        recipe: recipeData
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRecipe = (req, res, next) => {
  const recipeId=req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipesData => {
      res.status(200).json(recipesData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findByIdAndDelete(recipeId)
    .then(recipeData => {
      res.status(200).json({
        message: 'Recipe deleted',
        errors: '',
        recipe: recipeData
      });
    })
    .catch(err => {
      console.log(err);
    });
};
