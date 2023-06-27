const express = require('express');
const generateToken = require('../utils/tokenGenerator');
const loginValidate = require('../middlewares/loginValidate');

const loginRouter = express.Router();

loginRouter.post('/', loginValidate, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = loginRouter;