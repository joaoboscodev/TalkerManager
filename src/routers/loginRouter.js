const express = require('express');
const generateToken = require('../utils/tokenGenerator');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
});

module.exports = loginRouter;