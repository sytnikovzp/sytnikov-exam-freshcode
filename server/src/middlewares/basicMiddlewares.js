const createError = require('http-errors');
// =============================================
const constants = require('../constants');
const { Sequelize, Contest } = require('../db/dbPostgres/models');

module.exports.canGetContest = async (req, res, next) => {
  let result = null;

  try {
    if (req.tokenData.role === constants.USER_ROLES.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: req.headers.contestId, userId: req.tokenData.userId },
      });
    }
    if (req.tokenData.role === constants.USER_ROLES.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: req.headers.contestId,
          status: {
            [Sequelize.Op.or]: [
              constants.CONTEST_STATUS.ACTIVE,
              constants.CONTEST_STATUS.FINISHED,
            ],
          },
        },
      });
    }

    result ? next() : next(createError(423, 'Not enough rights!'));
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.onlyForCreator = (req, res, next) => {
  if (req.tokenData.role !== constants.USER_ROLES.CREATOR) {
    next(createError(423, 'Not enough rights!'));
  }

  next();
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role !== constants.USER_ROLES.CUSTOMER) {
    next(createError(423, 'This page only for customers!'));
  }

  next();
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role !== constants.USER_ROLES.CREATOR) {
    next(createError(423, 'Not enough rights!'));
  }

  try {
    const result = await Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });

    if (
      result.get({ plain: true }).status !== constants.CONTEST_STATUS.ACTIVE
    ) {
      next(createError(423, 'Not enough rights!'));
    }

    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: constants.CONTEST_STATUS.ACTIVE,
      },
    });

    if (!result) {
      next(createError(423, 'Not enough rights!'));
    }

    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: {
          [Sequelize.Op.not]: constants.CONTEST_STATUS.FINISHED,
        },
      },
    });

    if (!result) {
      next(createError(423, 'Not enough rights!'));
    }

    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
