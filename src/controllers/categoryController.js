const categoryServices = require('../services/categoryServices');

const insert = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryServices.insert(name);
  console.log(name);
  return res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data } = await categoryServices.findAll();
  return res.status(status).json(data);
};

module.exports = {
  insert,
  findAll,
};