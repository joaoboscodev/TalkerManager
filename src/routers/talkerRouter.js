const express = require('express');
const readFile = require('../utils/readFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const response = await readFile();
  return res.status(200).json(response);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await readFile();
  const talkerFinder = response.find((talker) => talker.id === Number(id));
  if (talkerFinder) {
    return res.status(200).json(talkerFinder);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;