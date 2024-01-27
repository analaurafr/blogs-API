const { Category } = require('../models');

const insert = async (name) => {
  try {
    const response = await Category.create({ name });
    return { status: 201, data: response };
  } catch (error) {
    return { status: 404, data: error };
  }
};

const findAll = async () => {
  try {
    const response = await Category.findAll();
    return { status: 200, data: response };
  } catch (error) {
    return { status: 404, data: error };
  }
};

module.exports = {
  insert,
  findAll,
};