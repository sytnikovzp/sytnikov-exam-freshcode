const createError = require('http-errors');
const dbPostgres = require('../../db/dbPostgres/models');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await dbPostgres.Contest.update(
    data,
    { where: predicate, returning: true, transaction }
  );

  if (updatedCount !== 1) {
    throw createError(500, 'cannot update сontest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await dbPostgres.Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updateResult[0] < 1) {
    throw createError(500, 'cannot update сontest');
  } else {
    return updateResult[1][0].dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await dbPostgres.Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw createError(500, 'cannot update offer');
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await dbPostgres.Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (result[0] < 1) {
    throw createError(500, 'cannot update offer');
  } else {
    return result[1];
  }
};

module.exports.createOffer = async (data) => {
  const result = await dbPostgres.Offer.create(data);

  if (!result) {
    throw createError(500, 'cannot create new offer');
  } else {
    return result.get({ plain: true });
  }
};
