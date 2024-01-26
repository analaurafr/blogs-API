const jwt = require('jsonwebtoken');

const passwordSecret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
  const authorization = req.header('Authorization');
  try {
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
    const [, bearer] = authorization.split(' ');
    jwt.verify(bearer, passwordSecret);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = { validateToken };