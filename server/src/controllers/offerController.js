/* eslint-disable camelcase */
const controller = require('../socketInit');
// =============================================
const constants = require('../constants');
const {
  createNewOffer,
  updateExistingOffer,
  updateExistingContestStatus,
  updateExistingOfferStatus,
} = require('./queries/contestQueries');
const { updateExistingUser } = require('./queries/userQueries');
const { sequelize } = require('../db/dbPostgres/models');

const rejectOffer = async (offerId, creatorId, contestId, transaction) => {
  const rejectedOffer = await updateExistingOffer(
    { status: constants.OFFER_STATUS.REJECTED },
    { id: offerId },
    transaction
  );

  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected!',
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
                WHEN "id"=${contestId}  AND "order_id"='${orderId}' 
                  THEN '${constants.CONTEST_STATUS.FINISHED}'
                WHEN "order_id"='${orderId}' AND "priority"=${priority + 1}  
                  THEN '${constants.CONTEST_STATUS.ACTIVE}'
                ELSE '${constants.CONTEST_STATUS.PENDING}'
                END
        `),
    },
    { order_id: orderId },
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
    { contestId },
    transaction
  );

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

module.exports.createOffer = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const obj = {};

    if (req.body.contestType === constants.CONTEST_TYPES.LOGO_CONTEST) {
      obj.fileName = req.file.filename;
      obj.originalFileName = req.file.originalname;
    } else {
      obj.text = req.body.offerData;
    }

    obj.userId = req.tokenData.userId;
    obj.contestId = req.body.contestId;

    const result = await createNewOffer(obj, transaction);

    delete result.contestId;
    delete result.userId;

    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);

    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });

    await transaction.commit();

    res.send(Object.assign({}, result, { User }));
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};

module.exports.setOfferStatus = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    if (req.body.command === 'reject') {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
        transaction
      );

      await transaction.commit();

      return res.status(200).json(offer);
    } else if (req.body.command === 'resolve') {
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );

      await transaction.commit();

      return res.status(200).json(winningOffer);
    }
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};
