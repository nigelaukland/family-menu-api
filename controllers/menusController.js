const Menu = require('./../models/menu');
const DayMenu = require('./../models/dayMenu');

exports.getCurrentMenu = (req, res, next) => {
  Menu.findOne()
    .populate({
      path: 'meals',
      populate: {
        path: 'morningRecipeId lunchRecipeId dinnerRecipeId'
      }
    })
    .then(menuData => {
      res.status(200).json(menuData);
    })
    .catch(err => {
      console.log(err);
    });
};

