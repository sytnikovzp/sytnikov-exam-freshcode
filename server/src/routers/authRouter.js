const { Router } = require('express');
// ============================
const userController = require('../controllers/userController');
// ============================
const checkToken = require('../middlewares/checkToken');
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');

const router = new Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.get('/getUser', checkToken.checkAuth);

module.exports = router;
