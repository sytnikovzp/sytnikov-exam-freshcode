const bcrypt = require('bcrypt');
const createError = require('http-errors');
// =============================================
const dbPostgres = require('../../db/dbPostgres/models');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await dbPostgres.User.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'Cannot update this user!');
  }

  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await dbPostgres.User.findOne({
    where: predicate,
    transaction,
  });

  if (!result) {
    throw createError(404, 'A user with such credentials does not exist!');
  }

  return result.get({ plain: true });
};

module.exports.userCreation = async (data) => {
  const newUser = await dbPostgres.User.create(data);

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
