const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');
const readTalkersData = async (q, rate) => {
  try {
    const data = JSON.parse(await fs.readFile(talkerPath));
    let dataFiltered = data;
    if (q) {
      dataFiltered = data.filter((talker) => talker.name.includes(q));
    } 
    if (rate) {
      dataFiltered = dataFiltered.filter(({ talk }) => talk.rate === Number(rate));
    }
    return dataFiltered;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

module.exports = readTalkersData;
