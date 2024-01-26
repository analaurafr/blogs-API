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

module.exports = insertUser;