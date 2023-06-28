const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number' || age < 18 || age % 1 !== 0) {
    return res.status(400).json({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateRate = (rate) => {
  if (rate === undefined) {
    return { message: 'O campo "rate" é obrigatório' };
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return {
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    };
  }
};

const validateTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (validateRate(talk.rate)) {
    return res.status(400).json(validateRate(talk.rate));
  }
  next();
};

module.exports = { validateName, validateAge, validateTalker };