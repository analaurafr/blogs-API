const { createToken } = require('../utils/token');
const userServices = require('../services/userService');

const insert = async (req, res) => {
  const payload = req.body;
  const response = await userServices.insertUser(payload);
  if (response.ValidationError) {
    return res.status(404).json({ message: 'error' });
  }

  const token = createToken(payload.email);

  return res.status(201).json({ token });
};

module.exports = insert;