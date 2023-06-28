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

module.exports = { createTalker, deleteTalker };