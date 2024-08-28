import socketIoClient from 'socket.io-client';
// =============================================
import { SERVER_CONFIG } from '../../../constants';

class WebSocket {
  constructor(dispatch, getState, room) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = socketIoClient(`${SERVER_CONFIG.BASE_URL}${room}`, {
      origins: 'localhost:*',
    });
    this.listen();
  }

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  anotherSubscribes = () => {};
}

export default WebSocket;
