const { createToken } = require('../utils/token');

const loginController = (req, res) => {
  const { email } = req.body;
  const response = createToken(email);

  return res.status(200).json({ token: response });
};

module.exports = loginController;