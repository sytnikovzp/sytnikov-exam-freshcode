const { Router } = require('express');
// ============================
const contestController = require('../controllers/contestController');
// ============================
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
// ============================
const upload = require('../utils/fileUpload');

const router = new Router();

router.get(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreator,
  contestController.getAllContests
);

router.get(
  '/getContestById/:contestId',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

router.get(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests
);

router.patch(
  '/updateContest/:contestId',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
);

router.get(
  '/getDataForContest',
  checkToken.checkToken,
  contestController.getDataForContest
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
);

module.exports = router;
