const { User } = require('../models');

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }

  const response = await User.findOne({ where: { email, password } });
  if (!response) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }

  next();
};

const validateNameAndPassword = (req, res, next) => {
  const { displayName, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  const response = await User.findOne({ where: { email } });
  if (response) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }

  next();
};

module.exports = { validateLogin,
  validateNameAndPassword,
  validateEmail,
};