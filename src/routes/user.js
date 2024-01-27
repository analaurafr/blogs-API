const { Router } = require('express');
const { validateNameAndPassword, validateEmail, validateToken } = require('../middlewares');
const user = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', validateNameAndPassword, validateEmail, user.insert);

userRoute.get('/', validateToken, user.findAll);

userRoute.get('/:id', validateToken, user.findOne);

userRoute.delete('/me', validateToken, user.deleteUser);

module.exports = userRoute;