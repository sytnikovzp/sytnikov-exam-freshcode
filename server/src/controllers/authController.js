const createError = require('http-errors');
const jwt = require('jsonwebtoken');
// =============================================
const constants = require('../constants');
const userQueries = require('./queries/userQueries');
const { sequelize } = require('../db/dbPostgres/models');

module.exports.registration = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass }),
      transaction
    );

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

    await userQueries.updateUser({ accessToken }, newUser.id, transaction);

    await transaction.commit();
    res.send({ token: accessToken });
  } catch (error) {
    await transaction.rollback();

    if (error.name === 'SequelizeUniqueConstraintError') {
      next(createError(409, 'This email were already used!'));
    } else {
      console.log(error.message);
      await transaction.rollback();
      next(createError(500, error));
    }
  }
};

module.exports.login = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const foundUser = await userQueries.findUser(
      { email: req.body.email },
      transaction
    );

    await userQueries.passwordCompare(req.body.password, foundUser.password);

    const accessToken = jwt.sign(
      {
        userId: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        displayName: foundUser.displayName,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
        balance: foundUser.balance,
        rating: foundUser.rating,
      },
      constants.AUTH.JWT_SECRET,
      { expiresIn: constants.AUTH.ACCESS_TOKEN_TIME }
    );

    await userQueries.updateUser({ accessToken }, foundUser.id, transaction);

    await transaction.commit();
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};
