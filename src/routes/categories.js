const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const { validateToken, validateName } = require('../middlewares');

const categoryRouter = Router();

categoryRouter.get('/', validateToken, categoryController.findAll);
categoryRouter.post('/', validateToken, validateName, categoryController.insert);

module.exports = categoryRouter;