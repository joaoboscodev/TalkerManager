const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');
const readTalkersData = async (q) => {
  try {
    const data = JSON.parse(await fs.readFile(talkerPath));
    if (q) {
      return data.filter((talker) => talker.name.includes(q));
    }
    return data;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

module.exports = readTalkersData;
