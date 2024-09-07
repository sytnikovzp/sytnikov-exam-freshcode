const createError = require('http-errors');
const constants = require('../constants');
const dbPostgres = require('../db/dbPostgres/models');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await dbPostgres.sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: dbPostgres.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${req.body.number.replace(
              / /g,
              ''
            )}' AND "cvc"='${req.body.cvc}' AND "expiry"='${req.body.expiry}'
                THEN "balance"-${req.body.price}
            WHEN "cardNumber"='${constants.SQUADHELP_BANK.NUMBER}' AND "cvc"='${
          constants.SQUADHELP_BANK.CVC
        }' AND "expiry"='${constants.SQUADHELP_BANK.EXPIRY}'
                THEN "balance"+${req.body.price} END
        `),
      },
      {
        cardNumber: {
          [dbPostgres.Sequelize.Op.in]: [
            constants.SQUADHELP_BANK.NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize =
        index === req.body.contests.length - 1
          ? Math.ceil(req.body.price / req.body.contests.length)
          : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await dbPostgres.Contest.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (error) {
    transaction.rollback();
    console.log(error.message);
    next(error);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await dbPostgres.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: dbPostgres.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId,
      transaction
    );
    await bankQueries.updateBankBalance(
      {
        balance: dbPostgres.sequelize.literal(`CASE 
                WHEN "cardNumber"='${req.body.number.replace(
                  / /g,
                  ''
                )}' AND "expiry"='${req.body.expiry}' AND "cvc"='${
          req.body.cvc
        }'
                    THEN "balance"+${req.body.sum}
                WHEN "cardNumber"='${
                  constants.SQUADHELP_BANK.NUMBER
                }' AND "expiry"='${
          constants.SQUADHELP_BANK.EXPIRY
        }' AND "cvc"='${constants.SQUADHELP_BANK.CVC}'
                    THEN "balance"-${req.body.sum}
                 END
                `),
      },
      {
        cardNumber: {
          [dbPostgres.Sequelize.Op.in]: [
            constants.SQUADHELP_BANK.NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (error) {
    transaction.rollback();
    console.log(error.message);
    next(error);
  }
};
