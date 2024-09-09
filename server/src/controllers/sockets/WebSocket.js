const constants = require('../../constants');

class WebSocket {
  connect(namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen() {
    this.io.on(constants.SOCKET_EVENTS.CONNECTION, (socket) => {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes() {}

  onSubscribe(socket) {
    socket.on(constants.SOCKET_EVENTS.SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe(socket) {
    socket.on(constants.SOCKET_EVENTS.UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

module.exports = WebSocket;
