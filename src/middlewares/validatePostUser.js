const jwt = require('jsonwebtoken');
const { BlogPost, User } = require('../models');

const passwordSecret = process.env.JWT_SECRET;

const validateIfPostIsFromUser = async (req, res, next) => {
  const [, bearer] = req.header('Authorization').split(' ');
  const { id } = req.params;
  const email = jwt.verify(bearer, passwordSecret);
  const user = await User.findOne({ where: { email } });
  const response = await BlogPost.findOne({ where: { id, userId: user.id } });
  if (!response) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }
  next();
};

module.exports = validateIfPostIsFromUser;