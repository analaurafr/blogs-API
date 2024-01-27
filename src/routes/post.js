const { Router } = require('express');
const postController = require('../controllers/postController');
const { validateToken, validateCategoryIds, validateBody, validateTokenEqualId, validateUpdateBody, 
  validateIfPostExist, validateIfPostIsFromUser } = require('../middlewares');

const postRouter = Router();

postRouter.get('/', validateToken, postController.findAllUser);

postRouter.get('/search', validateToken, postController.search);

postRouter.get('/:id', validateToken, postController.findPost);

postRouter.put(
  '/:id', 
  validateToken,
  validateTokenEqualId, 
  validateUpdateBody,
  postController.updatePost,
);

postRouter.post('/', validateToken, validateBody, validateCategoryIds, postController.insert);

postRouter.delete(
  '/:id', 
  validateToken, 
  validateIfPostExist, 
  validateIfPostIsFromUser,
  postController.deletePost,
);

module.exports = postRouter;