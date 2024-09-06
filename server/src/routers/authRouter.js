const { Router } = require('express');
// ============================
const authController = require('../controllers/authController');
// ============================
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');

const router = new Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  authController.registration
);

router.post(
  '/login',
  validators.validateLogin,
  authController.login
);

module.exports = router;
