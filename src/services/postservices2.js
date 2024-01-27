const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const deletePost = async ({ id }) => {
  const response = await BlogPost.destroy({ where: { id } });
  if (response === 0) { // Alteração nesta linha
    return { status: 404,
      data: {
        message: 'Post does not exist',
      } };
  }
  return { status: 204, data: null };
};

const search = async (q) => {
  if (q.length < 1) {
    const response = await BlogPost.findAll({ include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
    return { status: 200, data: response };
  }
  const response = await BlogPost.findAll({ where: {
    [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  return { status: 200, data: response };
};

module.exports = {
  deletePost,
  search,
};