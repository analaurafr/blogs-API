const { Router } = require('express');
const loginController = require('../controllers/login.controller');
const validateLogin = require('../middlewares/validates');

const loginRoute = Router();

loginRoute.post('/', validateLogin, loginController);

module.exports = loginRoute;