const { Router } = require('express');
// ============================
const chatController = require('../controllers/chatController');
// ============================
const checkToken = require('../middlewares/checkToken');

const router = new Router();

router.get(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

router.get(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat
);

router.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage
);

router.patch(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat
);

router.patch(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList
);

router.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs
);

router.patch(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog
);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog
);

router.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog
);

router.patch(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog
);

router.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog
);

module.exports = router;
