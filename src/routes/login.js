const { Router } = require('express');
const { validateLogin } = require('../middlewares/validates');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.post('/', validateLogin, loginController);

module.exports = loginRoute;