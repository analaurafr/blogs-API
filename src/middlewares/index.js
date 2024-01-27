const { validateEmail, validateLogin, validateNameAndPassword } = require('./validates');
const { validateToken } = require('./validateToken');
const { validateName } = require('./validateCategory');
const { validateIfPostIsFromUser } = require('./validatePostUser');
const { 
  validateBody, 
  validateCategoryIds,
  validateUpdateBody, 
  validateTokenEqualId,
  validateIfPostExist,
} = require('./validateBlogPost');

module.exports = {
  validateEmail,
  validateLogin,
  validateNameAndPassword,
  validateToken,
  validateName,
  validateBody,
  validateCategoryIds,
  validateTokenEqualId,
  validateUpdateBody,
  validateIfPostExist,
  validateIfPostIsFromUser,
};