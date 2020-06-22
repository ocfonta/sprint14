// const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const { JWT_SECRET } = process.env;

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (password.length >= 6) {
    bcrypt.hash(password, 10)
      .then((hashPassword) => User.create({
        name,
        about,
        avatar,
        email,
        password: hashPassword,
      }))
      .then((user) => res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(409)
            .send({ message: err.message });
        }
        if (err.name === 'CastError') {
          return res.status(400)
            .send({ message: err.message });
        }
        return res.status(500)
          .send({ message: err.message });
      });
  } else res.status(400).send({ message: 'Пароль слишком короткий' });
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findByEmail(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

/* const login = (req, res) => {
  const { email, password } = req.body;
  return User.findByEmail(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}; */
module.exports = {
  allUsers, idUser, createUser, login,
};
