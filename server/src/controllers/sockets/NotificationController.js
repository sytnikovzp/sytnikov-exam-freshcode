const constants = require('../../constants');
const WebSocket = require('./WebSocket');

class NotificationController extends WebSocket {
  emitEntryCreated(target) {
    this.io.to(target).emit(constants.NOTIFICATIONS.ENTRY_CREATED);
  }

  emitChangeMark(target) {
    this.io.to(target).emit(constants.NOTIFICATIONS.CHANGE_MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io.to(target).emit(constants.NOTIFICATIONS.CHANGE_OFFER_STATUS, {
      message,
      contestId,
    });
  }
}

module.exports = NotificationController;
