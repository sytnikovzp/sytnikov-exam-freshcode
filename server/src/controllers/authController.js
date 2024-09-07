const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const constants = require('../constants');
const userQueries = require('./queries/userQueries');

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass })
    );
    console.log(newUser);
    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        userId: newUser.id,
        role: newUser.role,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        displayName: newUser.displayName,
        balance: newUser.balance,
        email: newUser.email,
        rating: newUser.rating,
      },
      constants.AUTH.JWT_SECRET,
      { expiresIn: constants.AUTH.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      next(createError(409, 'this email were already exist'));
    } else {
      console.log(error.message);
      next(createError(500, error));
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(createError(400, 'Email and password are required'));
    }

    const foundUser = await userQueries.findUser({ email: req.body.email });
    if (!foundUser) {
      return next(createError(404, 'User not found'));
    }

    await userQueries.passwordCompare(req.body.password, foundUser.password);

    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      },
      constants.AUTH.JWT_SECRET,
      { expiresIn: constants.AUTH.ACCESS_TOKEN_TIME }
    );

    await userQueries.updateUser({ accessToken }, foundUser.id);
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
