const fs = require('fs').promises;
const path = require('path');


const talkerPath = path.resolve(__dirname, '../talker.json');
const readTalkersData = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
}

module.exports = readTalkersData;