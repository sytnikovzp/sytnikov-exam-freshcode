const createError = require('http-errors');
// =============================================
const { Card } = require('../../db/dbPostgres/models');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, updatedCards] = await Card.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount < 2) {
    throw createError(403, 'Card decline transaction!');
  }

  return updatedCards[0];
};
