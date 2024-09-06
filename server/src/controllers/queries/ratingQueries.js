const dbPostgres = require('../../db/dbPostgres/models');
const createError = require('http-errors');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await dbPostgres.Rating.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'cannot update mark on this offer');
  }

  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  const result = await dbPostgres.Rating.create(data, { transaction });

  if (!result) {
    throw createError(500, 'cannot mark offer');
  } else {
    return result.get({ plain: true });
  }
};
