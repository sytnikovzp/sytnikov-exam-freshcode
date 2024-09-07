const createError = require('http-errors');
const jwt = require('jsonwebtoken');
// =============================================
const constants = require('../constants');
const userQueries = require('../controllers/queries/userQueries');

module.exports.getUserByToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, 'Authorization token is required!'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const tokenData = jwt.verify(token, constants.AUTH.JWT_SECRET);

    const foundUser = await userQueries.findUser({ id: tokenData.userId });

    if (!foundUser) {
      return next(createError(404, 'User not found!'));
    }

    res.status(200).json({
      userId: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      displayName: foundUser.displayName,
      email: foundUser.email,
      role: foundUser.role,
      avatar: foundUser.avatar,
      balance: foundUser.balance,
      rating: foundUser.rating,
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token!'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired!'));
    }
    console.error(error.message);
    next(error);
  }
};

module.exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, 'Token is required!'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(createError(401, 'Invalid token format!'));
  }

  try {
    req.tokenData = jwt.verify(token, constants.AUTH.JWT_SECRET);
    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    return next(createError(403, 'Invalid token!'));
  }
};
