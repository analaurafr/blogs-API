const route = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const validateUpdate = require('../middlewares/validateUpdates');
const { postController, deleteController } = require('../controllers');

route.delete('/:id', validateToken, deleteController.deletePost);
route.put('/:id', validateToken, validateUpdate, postController.updatePost);
route.get('/:id', validateToken, postController.getPostById);
route.post('/', validateToken, validatePost, postController.addPost);
route.get('/', validateToken, postController.getPosts);

module.exports = route;