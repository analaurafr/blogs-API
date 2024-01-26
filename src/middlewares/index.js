const { validateLogin, validateNameAndPassword, validateEmail } = require('./validates');
const { validateToken } = require('./validateToken');

module.exports = {
  validateLogin,
  validateNameAndPassword,
  validateEmail,
  validateToken,
};