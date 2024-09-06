const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const constants = require('../constants');
const userQueries = require('../controllers/queries/userQueries');

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    next(createError(408, 'need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, constants.AUTH.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (error) {
    console.log(error.message);
    next(createError(408, error));
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    next(createError(408, 'need token'));
  }

  try {
    req.tokenData = jwt.verify(accessToken, constants.AUTH.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    next(createError(408, error));
  }
};
