const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { Category, User, BlogPost } = require('../models');

const passwordSecret = process.env.JWT_SECRET;
const validateBody = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (title.length < 1 || content.length < 1 || !Array.isArray(categoryIds)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const valid = await Category.findAll();
  const responseCategory = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  console.log(valid);
  console.log(responseCategory);
  if (valid.length !== responseCategory.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

const validateTokenEqualId = async (req, res, next) => {
  const authorization = req.header('Authorization');
  const { id } = req.params;
  const [, bearer] = authorization.split(' ');
  const email = jwt.verify(bearer, passwordSecret);
  const user = await User.findOne({ where: { email } });
  if (user.id !== Number(id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { title, content } = req.body;
  if (title.length < 1 || content.length < 1) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateIfPostExist = async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogPost.findOne({ where: { id } });
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

module.exports = {
  validateBody,
  validateCategoryIds,
  validateUpdateBody,
  validateTokenEqualId,
  validateIfPostExist };