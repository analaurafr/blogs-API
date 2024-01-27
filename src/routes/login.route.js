const route = require('express').Router();

const { loginController } = require('../controllers');
const validadeLogin = require('../middlewares/validateLogin');

route.post('/', validadeLogin, loginController);

module.exports = route;