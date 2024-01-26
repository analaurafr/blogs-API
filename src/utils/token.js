const jwt = require('jsonwebtoken');

const passwordSecret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const createToken = (email) => {
  const token = jwt.sign(email, passwordSecret);
  return token;
};

module.exports = { createToken };