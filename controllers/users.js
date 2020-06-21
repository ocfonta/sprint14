const validator = require('validator');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,

  })
    .then((user) => {
      if (validator.isURL(avatar)) {
        res.status(201).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      } else res.status(400).send({ message: 'Ошибка ссылки на изображение' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400)
          .send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400)
          .send({ message: err.message });
      }
      return res.status(500)
        .send({ message: err.message });
    });
};
const allUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
const idUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
module.exports = {
  allUsers, idUser, createUser,
};
