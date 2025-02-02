const controller = require('../socketInit');
// =============================================
const { updateExistingUser } = require('./queries/userQueries');
const {
  createNewRating,
  updateExistingRating,
} = require('./queries/ratingQueries');
const {
  Sequelize,
  sequelize,
  Rating,
  Offer,
} = require('../db/dbPostgres/models');

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    createNewRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );

  const getUpdateQuery = () =>
    updateExistingRating({ mark }, { offerId, userId }, transaction);

  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.updateUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }

    const updatedUser = await updateExistingUser(
      req.body,
      req.tokenData.userId,
      transaction
    );

    await transaction.commit();

    res.status(200).json({
      userId: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      balance: updatedUser.balance,
      rating: updatedUser.rating,
    });
  } catch (error) {
    console.log('Error occurred during update user: ', error.message);
    await transaction.rollback();
    next(error);
  }
};

module.exports.changeMark = async (req, res, next) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  });

  const { isFirst, offerId, mark, creatorId } = req.body;

  const userId = req.tokenData.userId;

  let sum = 0;
  let avg = 0;

  try {
    const query = getQuery(offerId, userId, mark, isFirst, transaction);

    await query();

    const offersArray = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });

    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }

    avg = sum / offersArray.length;

    await updateExistingUser({ rating: avg }, creatorId, transaction);

    await transaction.commit();

    controller.getNotificationController().emitChangeMark(creatorId);

    return res.status(200).json({ userId: creatorId, rating: avg });
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    next(error);
  }
};
