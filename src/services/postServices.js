const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost, User, PostCategory, Category } = require('../models');

const passwordSecret = process.env.JWT_SECRET;

const insert = async ({ title, content, categoryIds }, bearer) => {
  const t = await sequelize.transaction();
  try {
    const email = jwt.verify(bearer, passwordSecret);
    const [user] = await User.findAll({ where: { email } });
    const response = await BlogPost.create({
      title, content, userId: user.id, updated: new Date(), published: new Date(),
    }, { transaction: t });
    const postCategory = categoryIds.map((id) => ({ postId: response.id, categoryId: id }));
    await PostCategory.bulkCreate(postCategory);
    await t.commit();
    return { status: 201, data: response };
  } catch (error) {
    return { status: 404, data: { message: 'error' } };
  }
};

const findAll = async (bearer) => {
  const email = jwt.verify(bearer, passwordSecret);
  const user = await User.findOne({ where: { email } });
  const response = await BlogPost.findAll({ where: { userId: user.id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] } }] });
  return { status: 200, data: response };
};

const findPost = async (id) => {
  const response = await BlogPost.findOne({ where: { id },
    include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] } },
    { model: Category,
      as: 'categories',
      through: { attributes: [] } }] });
  if (!response) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }
  return { status: 200, data: response };
};

const updatePost = async (id, { title, content }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const result = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { status: 200, data: result };
};

module.exports = { insert, findAll, findPost, updatePost };