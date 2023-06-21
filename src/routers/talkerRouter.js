const express = require('express');
const readFile = require('../utils/readFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const response = await readFile();
  return res.status(200).json(response);
});

module.exports = talkerRouter;