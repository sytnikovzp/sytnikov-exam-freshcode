const createError = require('http-errors');
const jwt = require('jsonwebtoken');
// =============================================
const constants = require('../constants');
const {
  createNewUser,
  updateExistingUser,
  findExistingUser,
  passwordCompare,
} = require('./queries/userQueries');
const { sequelize } = require('../db/dbPostgres/models');

module.exports.registration = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const emailLowerCase = req.body.email.toLowerCase();

    const newUser = await createNewUser(
      Object.assign(req.body, {
        email: emailLowerCase,
        password: req.hashPass,
      }),
      transaction
    );

    const accessToken = jwt.sign(
      {
        userId: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        displayName: newUser.displayName,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        balance: newUser.balance,
        rating: newUser.rating,
      },
      constants.AUTH.JWT_SECRET,
      { expiresIn: constants.AUTH.ACCESS_TOKEN_TIME }
    );

    await updateExistingUser({ accessToken }, newUser.id, transaction);
    await transaction.commit();
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    await transaction.rollback();

    if (error.name === 'SequelizeUniqueConstraintError') {
      next(createError(409, 'This email was already used!'));
    } else {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const emailLowerCase = req.body.email.toLowerCase();

    const foundUser = await findExistingUser({ email: emailLowerCase }, transaction);

    await passwordCompare(req.body.password, foundUser.password);

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

    await updateExistingUser({ accessToken }, foundUser.id, transaction);
    await transaction.commit();
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};
