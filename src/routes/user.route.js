const route = require('express').Router();

const { userController, deleteController } = require('../controllers');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

route.delete('/me', validateToken, deleteController.deleteUser);
route.get('/:id', validateToken, userController.getUserById);
route.get('/', validateToken, userController.getUsers);
route.post('/', validateUser, userController.createUser);

module.exports = route;