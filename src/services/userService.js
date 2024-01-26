const { User } = require('../models');

const insertUser = async ({ displayName, password, email, image = null }) => {
  const response = await User.create({
    displayName,
    password,
    email,
    image,
  });

  return response;
};

const listUser = async () => {
  const response = await User.findAll({ attributes: {
    exclude: ['password'],
  } });
  return response;
};

const find = async (id) => {
  const response = await User.findOne({ where: { id },
    attributes: {
      exclude: ['password'],
    } });
  return response;
};

const deleteUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  const response = await User.destroy({ where: { id: user.id } });
  if (response.rowsDeleted === 0) {
    return { status: 404, data: { message: 'User not found' } };
  }
  return { status: 204, data: null };
};

module.exports = {
  insertUser,
  listUser,
  find,
  deleteUser,
};