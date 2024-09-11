const createError = require('http-errors');
// =============================================
const constants = require('../constants');
const { Sequelize } = require('../db/dbPostgres/models');
const {
  sequelize,
  Contest,
  Offer,
  User,
  Rating,
} = require('../db/dbPostgres/models');

function getPredicateTypes(index) {
  return {
    [Sequelize.Op.or]: [constants.CONTEST_TYPES.TYPES[index].split(',')],
  };
}

module.exports.getAllContests = async (req, res, next) => {
  try {
    const object = {
      where: {},
      order: [],
    };

    console.log('Query Parameters:', req.query);

    if (req.query.typeIndex) {
      Object.assign(object.where, {
        contestType: getPredicateTypes(req.query.typeIndex),
      });
    }
    if (req.query.contestId) {
      Object.assign(object.where, { id: req.query.contestId });
    }
    if (req.query.industry) {
      Object.assign(object.where, { industry: req.query.industry });
    }
    if (req.query.awardSort) {
      object.order.push(['prize', req.query.awardSort]);
    }

    Object.assign(object.where, {
      status: {
        [Sequelize.Op.or]: [
          constants.CONTEST_STATUS.FINISHED,
          constants.CONTEST_STATUS.ACTIVE,
        ],
      },
    });
    object.order.push(['id', 'desc']);

    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const ownEntries = req.query.ownEntries === 'true';

    const contests = await Contest.findAll({
      where: object.where,
      order: object.order,
      limit,
      offset,
      include: [
        {
          model: Offer,
          required: ownEntries,
          where: ownEntries ? { userId: req.tokenData.userId } : {},
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );

    const haveMore = contests.length > 0;

    return res.status(200).json({ contests, haveMore });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    let contestInfo = await Contest.findOne({
      where: { id: contestId },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where:
            req.tokenData.role === constants.USER_ROLES.CREATOR
              ? { userId: req.tokenData.userId }
              : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    if (!contestInfo) {
      throw createError(404, 'Contest not found!');
    }

    contestInfo = contestInfo.get({ plain: true });

    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });

    return res.status(200).json(contestInfo);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const { status, limit = 10, offset = 0 } = req.query;

    const contests = await Contest.findAll({
      where: { status, userId: req.tokenData.userId },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['id', 'DESC']],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );

    const haveMore = contests.length === limit;

    return res.status(200).json({ contests, haveMore });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.updateContest = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { contestId } = req.params;

    if (!contestId) {
      throw createError(400, 'Contest ID is required!');
    }

    if (req.file) {
      req.body.fileName = req.file.filename;
      req.body.originalFileName = req.file.originalname;
    }

    const contest = await Contest.findOne({
      where: { id: contestId, userId: req.tokenData.userId },
      transaction,
    });

    if (!contest) {
      throw createError(404, 'Contest not found!');
    }

    await contest.update(req.body, { transaction });

    await transaction.commit();

    return res.status(200).json(contest);
  } catch (error) {
    await transaction.rollback();
    console.log(error.message);
    next(error);
  }
};

module.exports.getDataForContest = (req, res, next) => {
  const response = {};

  try {
    const { characteristic1, characteristic2 } = req.query;

    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );

    types.forEach((type) => {
      if (constants.SELECT_OPTIONS[type]) {
        response[type] = constants.SELECT_OPTIONS[type];
      }
    });

    if (!types.length) {
      Object.keys(constants.SELECT_OPTIONS).forEach((key) => {
        response[key] = constants.SELECT_OPTIONS[key];
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    next(createError(500, 'Сannot get contest preferences!'));
  }
};

module.exports.downloadFile = async (req, res) => {
  const file = constants.PATHS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};
