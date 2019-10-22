const mongoose = require('mongoose');
const DayMenu = require('./../models/dayMenu');

exports.postDayMenu = (req, res, next) => {
  const startDate = req.body.startDate;
  const morningRecipeId = (req.body.morningRecipeId == '') ? undefined : mongoose.Types.ObjectId(req.body.morningRecipeId);
  const morningText = req.body.morningText;
  const lunchRecipeId = (req.body.lunchRecipeId == '') ? undefined : mongoose.Types.ObjectId(req.body.lunchRecipeId);
  const lunchText = req.body.lunchText;
  const dinnerRecipeId = (req.body.dinnerRecipeId == '') ? undefined : mongoose.Types.ObjectId(req.body.dinnerRecipeId);
  const dinnerText = req.body.dinnerText;
  const dayMenu = new DayMenu({
    startDate: startDate,
    morningRecipeId: morningRecipeId, 
    morningText: morningText, 
    lunchRecipeId: lunchRecipeId, 
    lunchText: lunchText, 
    dinnerRecipeId: dinnerRecipeId, 
    dinnerText: dinnerText
  });
  dayMenu
  .save()
  .then(dayMenuData => {
    res.status(200).json({
      message: 'dayMenu added',
      errors: '',
      dayMenu: dayMenuData
    });
  })
.catch(err => {
    console.log(err)
  });
};
