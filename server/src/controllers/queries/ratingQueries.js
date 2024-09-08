const createError = require('http-errors');
// =============================================
const { Rating } = require('../../db/dbPostgres/models');

module.exports.updateExistingRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await Rating.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'Cannot update mark on this offer!');
  }

  return updatedRating.dataValues;
};

module.exports.createNewRating = async (data, transaction) => {
  const result = await Rating.create(data, { transaction });

  if (!result) {
    throw createError(500, 'Cannot mark offer!');
  }

  return result.get({ plain: true });
};
