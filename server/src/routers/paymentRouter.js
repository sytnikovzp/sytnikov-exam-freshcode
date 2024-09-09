const { Router } = require('express');
// ============================
const paymentController = require('../controllers/paymentController');
// ============================
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
// ============================
const upload = require('../utils/fileUpload');

const router = new Router();

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  validators.validateContestCreation,
  paymentController.payment
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreator,
  paymentController.cashout
);

module.exports = router;
