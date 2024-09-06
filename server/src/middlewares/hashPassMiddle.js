const constants = require('../constants');
const ServerError = require('../errors/ServerError');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(
      req.body.password,
      constants.AUTH.SALT_ROUNDS
    );
    next();
  } catch (error) {
    console.log(error.message);
    next(new ServerError('Server Error on hash password'));
  }
};
