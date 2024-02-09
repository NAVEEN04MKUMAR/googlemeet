import  Ismemorystore  from './src/store/Ismemorystore.js';

const Ismemorystoreinstance = new Ismemorystore();
Ismemorystoreinstance.initroom("room234");

const chat = Ismemorystoreinstance.addchat("user234", "johndoe", "room234", "hello world");
console.log("Added chat:", chat);

// Upvote the chat three times
for (let i = 0; i < 15; i++) {
  const upvotedChat = Ismemorystoreinstance.upvote(`user${i + 1}`, "room234", chat.id);
  console.log(`Upvoted chat ${i + 1} time(s):`, upvotedChat);
}

const chats = Ismemorystoreinstance.getchats("room234", 10, 0);
console.log("Chats:", chats);
