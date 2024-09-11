const createError = require('http-errors');
// =============================================
const { Contest, Offer } = require('../../db/dbPostgres/models');

module.exports.updateExistingContestStatus = async (
  data,
  predicate,
  transaction
) => {
  const [updatedCount, updatedContests] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount < 1) {
    throw createError(500, 'Cannot update contest status!');
  }

  return updatedContests[0].dataValues;
};

module.exports.createNewOffer = async (data, transaction) => {
  const result = await Offer.create(data, { transaction });

  if (!result) {
    throw createError(500, 'Cannot create new offer!');
  }

  return result.get({ plain: true });
};

module.exports.updateExistingOffer = async (data, predicate, transaction) => {
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

module.exports.updateExistingOfferStatus = async (
  data,
  predicate,
  transaction
) => {
  const [updatedCount, updatedOffers] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount < 1) {
    throw createError(500, 'Cannot update offer status!');
  }

  return updatedOffers;
};
