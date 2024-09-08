const moment = require('moment');
const { v4: uuid } = require('uuid');
// =============================================
const constants = require('../constants');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const { Sequelize, sequelize, Contest } = require('../db/dbPostgres/models');

const createContests = async (contests, price, userId, transaction) => {
  const orderId = uuid();

  contests.forEach((contest, index) => {
    const prize =
      index === contests.length - 1
        ? Math.ceil(price / contests.length)
        : Math.floor(price / contests.length);

    Object.assign(contest, {
      status: index === 0 ? 'active' : 'pending',
      userId,
      priority: index + 1,
      orderId,
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
      prize,
    });
  });

  await Contest.bulkCreate(contests, transaction);
};

module.exports.payment = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { number, cvc, expiry, price, contests } = req.body;
    const cleanedCardNumber = number.replace(/ /g, '');

    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`
          CASE
            WHEN "cardNumber" = :number AND "cvc" = :cvc AND "expiry" = :expiry
              THEN "balance" - :price
            WHEN "cardNumber" = :bankNumber AND "cvc" = :bankCvc AND "expiry" = :bankExpiry
              THEN "balance" + :price
          END
        `),
      },
      {
        cardNumber: {
          [Sequelize.Op.in]: [
            constants.SQUADHELP_BANK.NUMBER,
            cleanedCardNumber,
          ],
        },
      },
      transaction,
      {
        number: cleanedCardNumber,
        cvc,
        expiry,
        price,
        bankNumber: constants.SQUADHELP_BANK.NUMBER,
        bankCvc: constants.SQUADHELP_BANK.CVC,
        bankExpiry: constants.SQUADHELP_BANK.EXPIRY,
      }
    );

    await createContests(contests, price, req.tokenData.userId, transaction);
    await transaction.commit();
    res.send();
  } catch (error) {
    console.error(error.message);
    await transaction.rollback();
    next(error);
  }
};

module.exports.cashout = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { number, cvc, expiry, sum } = req.body;
    const cleanedCardNumber = number.replace(/ /g, '');

    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal('balance - :sum') },
      req.tokenData.userId,
      transaction,
      { sum }
    );

    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`
          CASE
            WHEN "cardNumber" = :number AND "expiry" = :expiry AND "cvc" = :cvc
              THEN "balance" + :sum
            WHEN "cardNumber" = :bankNumber AND "expiry" = :bankExpiry AND "cvc" = :bankCvc
              THEN "balance" - :sum
          END
        `),
      },
      {
        cardNumber: {
          [Sequelize.Op.in]: [
            constants.SQUADHELP_BANK.NUMBER,
            cleanedCardNumber,
          ],
        },
      },
      transaction,
      {
        number: cleanedCardNumber,
        cvc,
        expiry,
        sum,
        bankNumber: constants.SQUADHELP_BANK.NUMBER,
        bankCvc: constants.SQUADHELP_BANK.CVC,
        bankExpiry: constants.SQUADHELP_BANK.EXPIRY,
      }
    );

    await transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (error) {
    console.error(error.message);
    await transaction.rollback();
    next(error);
  }
};
