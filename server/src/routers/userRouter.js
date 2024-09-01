const { Router } = require('express');
// ============================
const userController = require('../controllers/userController');
// ============================
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
// ============================
const upload = require('../utils/fileUpload');

const router = new Router();

router.put(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

router.patch(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

module.exports = router;
