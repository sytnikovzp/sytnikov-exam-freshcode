const createError = require('http-errors');
// =============================================
const controller = require('../socketInit');
// =============================================
const constants = require('../constants');
const { createWhereForAllContests } = require('../utils/functions');
const {
  createNewOffer,
  updateExistingOffer,
  updateExistingContestStatus,
  updateExistingOfferStatus,
} = require('./queries/contestQueries');
const { updateExistingUser } = require('./queries/userQueries');
const {
  Sequelize,
  sequelize,
  Select,
  Contest,
  Offer,
  User,
  Rating,
} = require('../db/dbPostgres/models');

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await updateExistingOffer(
    { status: constants.OFFER_STATUS.REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await updateExistingContestStatus(
    {
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' 
              THEN '${constants.CONTEST_STATUS.FINISHED}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  
              THEN '${constants.CONTEST_STATUS.ACTIVE}'
            ELSE '${constants.CONTEST_STATUS.PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await updateExistingUser(
    {
      balance: sequelize.literal('balance + ' + finishedContest.prize),
    },
    creatorId,
    transaction
  );
  const updatedOffers = await updateExistingOfferStatus(
    {
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} 
              THEN '${constants.OFFER_STATUS.WON}'
            ELSE '${constants.OFFER_STATUS.REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === constants.OFFER_STATUS.REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected!',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN!', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.getAllContests = async (req, res, next) => {
  try {
    const predicates = createWhereForAllContests(
      req.body.typeIndex,
      req.body.contestId,
      req.body.industry,
      req.body.awardSort
    );

    const contests = await Contest.findAll({
      where: predicates.where,
      order: predicates.order,
      limit: req.body.limit || 10,
      offset: req.body.offset || 0,
      include: [
        {
          model: Offer,
          required: req.body.ownEntries,
          where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );

    const haveMore = contests.length === (req.body.limit || 10);

    res.send({ contests, haveMore });
  } catch (error) {
    console.error(error.message);
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
      return res.status(404).send({ message: 'Contest not found' });
    }

    contestInfo = contestInfo.get({ plain: true });

    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });

    res.send(contestInfo);
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

    res.send({ contests, haveMore });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports.updateContest = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    if (!contestId) {
      return res.status(400).send({ message: 'Contest ID is required' });
    }

    if (req.file) {
      req.body.fileName = req.file.filename;
      req.body.originalFileName = req.file.originalname;
    }

    const contest = await Contest.findOne({
      where: { id: contestId, userId: req.tokenData.userId },
    });

    if (!contest) {
      return res.status(404).send({ message: 'Contest not found' });
    }

    await contest.update(req.body);

    res.send(contest);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.getDataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { characteristic1, characteristic2 } = req.query;
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Sequelize.Op.or]: types,
        },
      },
      attributes: ['type', 'describe'],
    });

    if (characteristics.length === 0) {
      return res.status(404).send({ message: 'No characteristics found!' });
    }

    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });

    res.send(response);
  } catch (error) {
    console.log(error.message);
    next(createError(500, 'Cannot get contest preferences!'));
  }
};

module.exports.downloadFile = async (req, res) => {
  const file = constants.PATHS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.createOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === constants.CONTEST_TYPES.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await createNewOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.setOfferStatus = async (req, res, next) => {
  // !!!!!
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      res.send(winningOffer);
    } catch (error) {
      transaction.rollback();
      console.log(error.message);
      next(error);
    }
  }
};
