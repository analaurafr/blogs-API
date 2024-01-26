const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/token');
const userService = require('../services/userService');

const passwordSecret = process.env.JWT_SECRET;

const insert = async (req, res) => {
  const payload = req.body;
  const response = await userService.insertUser(payload);
  if (response.ValidationError) {
    return res.status(404).json({ message: 'error' });
  }

  const token = createToken(payload.email);

  return res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const response = await userService.listUser();
  return res.status(200).json(response);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await userService.find(id);
  if (!response) {
    return res.status(404).json({
      message: 'User does not exist',
    });
  }

  return res.status(200).json(response);
};

const deleteUser = async (req, res) => {
  const [, bearer] = req.header('Authorization').split(' ');
  const email = jwt.verify(bearer, passwordSecret);
  const { status, data } = await userService.deleteUser(email);
  return res.status(status).json(data);
};

module.exports = {
  insert,
  findAll,
  findOne,
  deleteUser,
};