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

exports.getMenus = (req, res, next) => {
  Menu.find()
    .then(menusData => {
      res.status(200).json(menusData);
    })
    // should sort by date descending?
    .catch(err => {
      console.log(err);
    });
};

exports.deleteMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  Menu.findByIdAndDelete(menuId)
    .then(menuData => {
      res.status(200).json({
        message: 'Menu deleted',
        errors: '',
        menu: menuData
      });
    })
    .catch(err => {
      console.log(err);
    });
};