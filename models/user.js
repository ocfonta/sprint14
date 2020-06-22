const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validate = require('mongoose-validator');
const validatorEmail = require('validator/lib/isEmail');
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
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validatorEmail,
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },

});

userSchema.statics.findByEmail = function FindUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
