import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(SOCKET_URL, {
      auth: { token: localStorage.getItem('token') },
      transports: ['websocket'],
    });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinCampaign(campaignId) {
    if (this.socket) this.socket.emit('join-campaign', campaignId);
  }

  onCampaignComplete(callback) {
    if (this.socket) this.socket.on('campaign-completed', callback);
  }

  offCampaignComplete() {
    if (this.socket) this.socket.off('campaign-completed');
  }
}

export default new SocketService();
