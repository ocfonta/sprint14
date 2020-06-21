const usersRoute = require('express').Router();
const { allUsers, idUser, createUser } = require('../controllers/users');

// GET
usersRoute.get('/', allUsers);
usersRoute.get('/:userId', idUser);
usersRoute.post('/', createUser);

module.exports = usersRoute;
