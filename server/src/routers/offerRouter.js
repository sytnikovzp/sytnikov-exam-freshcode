const { Router } = require('express');
// ============================
const offerController = require('../controllers/offerController');
// ============================
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
// ============================
const upload = require('../utils/fileUpload');

const router = new Router();

router.post(
  '/createOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offerController.createOffer
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus
);

module.exports = router;
