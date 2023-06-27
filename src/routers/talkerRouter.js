const express = require('express');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const { tokenValidate, validateAge,
validateName, validateTalker } = require('../middlewares/dataValidate');

const talkerRouter = express.Router();

talkerRouter.use(tokenValidate);
talkerRouter.use(validateAge);
talkerRouter.use(validateName);
talkerRouter.use(validateTalker);

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

talkerRouter.post('/', async (req, res) => {
  const { body } = req;
  const talkersData = await readFile();
  const id = talkersData[talkersData.length - 1].id + 1;
  const newTalker = { id, ...body };
  const newTalkers = [...talkersData, newTalker];
  await writeFile.createTalker(newTalkers);
  return res.status(201).json(newTalker);
});

module.exports = talkerRouter;