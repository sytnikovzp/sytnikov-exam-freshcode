const createError = require('http-errors');
// =============================================
const { Contest, Offer } = require('../../db/dbPostgres/models');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'Cannot update сontest!');
  }

  return updatedContest.dataValues;
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updateResult[0] < 1) {
    throw createError(500, 'Cannot update сontest status!');
  }

  return updateResult[1][0].dataValues;
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'Cannot update offer!');
  }

  return updatedOffer.dataValues;
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (result[0] < 1) {
    throw createError(500, 'Cannot update offer status!');
  }

  return result[1];
};

module.exports.createOffer = async (data, transaction) => {
  const result = await Offer.create(data, { transaction });

  if (!result) {
    throw createError(500, 'Cannot create new offer!');
  }

  return result.get({ plain: true });
};
