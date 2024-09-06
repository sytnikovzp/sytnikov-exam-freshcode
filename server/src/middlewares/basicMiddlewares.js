const createError = require('http-errors');
const dbPostgres = require('../db/dbPostgres/models');
const constants = require('../constants');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenData.role === constants.USER_ROLES.CUSTOMER) {
      result = await dbPostgres.Contest.findOne({
        where: { id: req.headers.contestId, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === constants.USER_ROLES.CREATOR) {
      result = await dbPostgres.Contest.findOne({
        where: {
          id: req.headers.contestId,
          status: {
            [dbPostgres.Sequelize.Op.or]: [
              constants.CONTEST_STATUS.ACTIVE,
              constants.CONTEST_STATUS.FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(createError(423, 'not enough rights'));
  } catch (error) {
    console.log(error.message);
    next(createError(500, error));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === constants.USER_ROLES.CUSTOMER) {
    next(createError(423, 'not enough rights'));
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === constants.USER_ROLES.CREATOR) {
    next(createError(423, 'this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === constants.USER_ROLES.CUSTOMER) {
    next(createError(423, 'not enough rights'));
  }
  try {
    const result = await dbPostgres.Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (
      result.get({ plain: true }).status === constants.CONTEST_STATUS.ACTIVE
    ) {
      next();
    } else {
      next(createError(423, 'not enough rights'));
    }
  } catch (error) {
    console.log(error.message);
    next(createError(500, error));
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await dbPostgres.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: constants.CONTEST_STATUS.ACTIVE,
      },
    });
    if (!result) {
      next(createError(423, 'not enough rights'));
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(createError(500, error));
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = dbPostgres.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: {
          [dbPostgres.Sequelize.Op.not]: constants.CONTEST_STATUS.FINISHED,
        },
      },
    });
    if (!result) {
      next(createError(423, 'not enough rights'));
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(createError(500, error));
  }
};
