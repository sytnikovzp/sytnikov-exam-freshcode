const moment = require('moment');
const { v4: uuid } = require('uuid');
// =============================================
const constants = require('../constants');
const { updateExistingUser } = require('./queries/userQueries');
const { updateBankBalance } = require('./queries/bankQueries');
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

    await updateBankBalance(
      {
        balance: sequelize.literal(`
          CASE
            WHEN "card_number" = '${cleanedCardNumber}' AND "cvc" = '${cvc}' AND "expiry" = '${expiry}'
              THEN "balance" - '${price}'
            WHEN "card_number" = '${constants.SQUADHELP_BANK.NUMBER}' AND "cvc" = '${constants.SQUADHELP_BANK.CVC}' AND "expiry" = '${constants.SQUADHELP_BANK.EXPIRY}'
              THEN "balance" + '${price}'
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

    res.sendStatus(res.statusCode);
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};

module.exports.cashout = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { number, cvc, expiry, sum } = req.body;
    const cleanedCardNumber = number.replace(/ /g, '');

    const updatedUser = await updateExistingUser(
      { balance: sequelize.literal(`"balance" - '${sum}'`) },
      req.tokenData.userId,
      transaction,
      { sum }
    );

    await updateBankBalance(
      {
        balance: sequelize.literal(`
          CASE
            WHEN "card_number" = '${cleanedCardNumber}' AND "cvc" = '${cvc}' AND "expiry" = '${expiry}'
              THEN "balance" + '${sum}'
            WHEN "card_number" = '${constants.SQUADHELP_BANK.NUMBER}' AND "cvc" = '${constants.SQUADHELP_BANK.CVC}' AND "expiry" = '${constants.SQUADHELP_BANK.EXPIRY}'
              THEN "balance" - '${sum}'
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

    res.status(200).json({ balance: updatedUser.balance });
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};
