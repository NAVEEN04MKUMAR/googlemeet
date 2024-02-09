class ChatRoom {
  constructor() {
    this.chatMessages = new Map();
    this.lastChatId = 0;
  }
//
  addMessage(userId, content) {
    const messageId = ++this.lastChatId;
    const newMessage = new ChatMessage(messageId, userId, content);
    this.chatMessages.set(messageId, newMessage);

    // Broadcast the new message to all connected clients
    broadcastMessage(newMessage);
  }
//add the upvote by the given the userid
  upvoteMessage(messageId, userId) {
    const message = this.chatMessages.get(messageId);
    if (message && !message.upvotes.includes(userId)) {
      message.upvotes.push(userId);

      // Broadcast the updated message to all connected clients
      broadcastMessage(message);
    }
  }
}

//broadcast to all the user
function broadcastMessage(message) {
  const messageData = JSON.stringify({
    type: 'chat',
    payload: message,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageData);
    }
  });
}
