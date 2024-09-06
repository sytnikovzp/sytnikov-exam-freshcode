const createError = require('http-errors');
const bcrypt = require('bcrypt');
const constants = require('../constants');

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(
      req.body.password,
      constants.AUTH.SALT_ROUNDS
    );
    next();
  } catch (error) {
    console.log(error.message);
    next(createError(500, 'Server Error on hash password'));
  }
};
