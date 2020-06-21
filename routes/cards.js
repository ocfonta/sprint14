const cardsRoute = require('express').Router();
const { createCard, allCards, delCard } = require('../controllers/cards');

cardsRoute.get('/', allCards);

cardsRoute.post('/', createCard);

cardsRoute.delete('/:cardId', delCard);

module.exports = cardsRoute;
