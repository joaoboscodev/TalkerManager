const fs = require('fs').promises;
const path = require('path');
const readFile = require('./readFile');

const talkersPath = path.resolve(__dirname, '../talker.json');
const createTalker = async (content) => {
  try {
    await fs.writeFile(talkersPath, JSON.stringify(content));
  } catch (e) {
    console.error('Erro ao salvar o arquivo', e.message);
    return null;
  }
};

const deleteTalker = async (id) => {
  const talkersData = await readFile();
  const newData = talkersData.filter((person) => person.id !== +id);
  await createTalker(newData);
};

const updateRate = async (id, updatedRate) => {
  const talkerData = await readFile();
  const updatedData = talkerData.map((talker) => {
    if (talker.id === +id) {
      return { ...talker, talk: { ...talker.talk, rate: +updatedRate } };
    }
    return talker;
  });
  await createTalker(updatedData);
};

module.exports = { createTalker, deleteTalker, updateRate };