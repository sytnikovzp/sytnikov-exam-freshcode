const constants = require('../../constants');
const WebSocket = require('./WebSocket');

class ChatController extends WebSocket {
  anotherSubscribes(socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket) {
    socket.on('subscribeChat', (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket) {
    socket.on('unsubscribeChat', (id) => {
      socket.join(id);
    });
  }

  emitNewMessage(target, message) {
    this.io
      .to(parseInt(target))
      .emit(constants.MESSAGES.NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target, message) {
    this.io
      .to(parseInt(target))
      .emit(constants.BLOCK_STATUS.CHANGE, { message });
  }
}

module.exports = ChatController;
