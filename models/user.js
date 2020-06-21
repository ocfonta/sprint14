const mongoose = require('mongoose');
const validate = require('mongoose-validator');
// валидатор
const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'Неверный формат URL',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: urlValidator,
  },

});
module.exports = mongoose.model('user', userSchema);
