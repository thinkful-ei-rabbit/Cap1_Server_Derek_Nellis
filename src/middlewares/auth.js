const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET, SALT_ROUNDS } = require('../config');

const CRUDService = require('../services/crud.service');

const createJwtService = (user_name, id) => {
  const subject = user_name;
  const payload = { user_id: id };

  return jwt.sign(payload, JWT_SECRET, {
    subject,
    algorithm: 'HS256'
  });
};

const passwordCheck = async (req, res, next) => {
  try {
    const plaintextPassword = req.body.password;
    const { password, user_name, id } = res.dbUser;

    const passwordsMatch = await bcrypt.compare(plaintextPassword, password);

    if (!passwordsMatch)
      return res.status(401).json({ error: 'Unauthorized request' });

    const token = createJwtService(user_name, id);

    return res.status(200).json({ authToken: token, user_name });
  } catch (error) {
    return next(error);
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    res.loginUser.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
};

const requireAuth = async (req, res, next) => {
  const authToken = req.get('Authorization') || '';

  if (!authToken.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'Missing bearer token' });

  const token = authToken.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256']
    });

    const user = await CRUDService.getByName(req.app.get('db'), payload.sub);

    if (!user) return res.status(404).json({ message: 'Data not found' });

    res.user = user;
  } catch (error) {
    next(error);
  }

  return next();
};

module.exports = { createJwtService, passwordCheck, hashPassword, requireAuth };
