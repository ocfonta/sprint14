const usersRoute = require('express').Router();
const { allUsers, idUser } = require('../controllers/users');

// GET
usersRoute.get('/', allUsers);
usersRoute.get('/:userId', idUser);

module.exports = usersRoute;
