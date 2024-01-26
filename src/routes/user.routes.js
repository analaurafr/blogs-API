const { Router } = require('express');
const { validateNameAndPassword, validateEmail } = require('../middlewares');
const user = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', validateNameAndPassword, validateEmail, user.insert);

module.exports = userRoute;