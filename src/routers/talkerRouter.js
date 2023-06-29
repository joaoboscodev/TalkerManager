const express = require('express');
const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const { validateAge, validateName,
validateTalker } = require('../middlewares/dataValidate');
const tokenValidate = require('../middlewares/tokenValidate');

const talkerRouter = express.Router();

talkerRouter.get('/search', tokenValidate, async (req, res) => {
  const { q } = req.query;
  const response = await readFile(q);
  return res.status(200).json(response);
});

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

talkerRouter.use(tokenValidate);

talkerRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await readFile();
  const talkerIndex = talkersData.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  await writeFile.deleteTalker(id);
  return res.sendStatus(204);
});

talkerRouter.use(validateAge);
talkerRouter.use(validateName);
talkerRouter.use(validateTalker);

talkerRouter.post('/', async (req, res) => {
  const { body } = req;
  const talkersData = await readFile();
  const id = talkersData[talkersData.length - 1].id + 1;
  const newTalker = { id, ...body };
  const newTalkers = [...talkersData, newTalker];
  await writeFile.createTalker(newTalkers);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const talkersData = await readFile();
  const talkerIndex = talkersData.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const updatedTalker = { id: talkersData[talkerIndex].id, ...body };
  talkersData[talkerIndex] = updatedTalker;

  await writeFile.createTalker(talkersData);
  return res.status(200).json(updatedTalker);
});

module.exports = talkerRouter;