const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5eed26602f330e19e4383548',
  };

  next();
});
app.use('/users', usersRoute);
app.use('/cards', cards);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {

// console.log(`App listening on port ${PORT}`);
});
