const express = require('express');
const router = express.Router();

// import controller
const menusController = require('../controllers/menusController');

// GET /menu/current
router.get("/menu/current", menusController.getCurrentMenu);

module.exports = router;

// router.get("/menus", menuController.getMenus);
// router.get("/menus/add", isAuth, menuController.addMenu);
// router.get("/menu/edit/:menuId", isAuth, menuController.getEditMenu);
// router.post("/menu", isAuth, menuController.postAddMenu);
// router.post("/menu/edit", isAuth, menuController.postEditMenu);
// router.get("/menu/delete/:menuId", isAuth, menuController.postDeleteMenu);

// // GET /recipes
// router.get('/recipes', recipesController.getRecipes);

// // POST /recipe
// router.post('/recipe', recipesController.postRecipe);

// // GET /recipe/:recipeId
// router.get('/recipe/:recipeId', recipesController.getRecipe);

// // DELETE /recipe/:recipeId
// router.delete('/recipe/:recipeId', recipesController.deleteRecipe);

