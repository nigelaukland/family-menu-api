const mongoose = require('mongoose');

// Schema is the class
const Schema = mongoose.Schema;

// instantiate a new object of class Schema
const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  meals: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'DayMenu', 
    required: false, 
    default: []
  }]
});

module.exports = mongoose.model('Menu', menuSchema);