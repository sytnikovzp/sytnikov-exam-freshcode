const bcrypt = require('bcrypt');
const createError = require('http-errors');
// =============================================
const { User } = require('../../db/dbPostgres/models');

module.exports.updateExistingUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await User.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'Cannot update this user!');
  }

  return updatedUser.dataValues;
};

module.exports.findExistingUser = async (predicate, transaction) => {
  const result = await User.findOne({
    where: predicate,
    transaction,
  });

  if (!result) {
    throw createError(404, 'A user with such credentials does not exist!');
  }

  return result.get({ plain: true });
};

module.exports.createNewUser = async (data, transaction) => {
  const newUser = await User.create(data, { transaction });

  if (!newUser) {
    throw createError(500, 'Server error on user creation!');
  }

  return newUser.get({ plain: true });
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);

  if (!passwordCompare) {
    throw createError(401, 'Wrong user password!');
  }
};
