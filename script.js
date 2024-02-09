// // client.js
// import {WebSocket} from 'ws';
// const socket = new WebSocket('ws://localhost:8000');

// socket.addEventListener('open', () => {
//   console.log('Connected to WebSocket server');

//     // Send a joinroom message to the server
//    socket.send(JSON.stringify({
//         type: "joinroom",
//         payload: {
//             name: "naveen",
//             userid: "naveen123",
//             roomid: "room123"
//         }
//     }));

//   // Send a message to the server
//   socket.send('Hello, WebSocket Server!');
// });

// socket.addEventListener('message',function(event){
// try{
//         const payload = JSON.parse(event.data);
//         console.log('Received message from server:', payload);
//     } catch (e) {
//         console.error(e);
//     }
//   });

// function sendchat() {
//   console.log('Sending chat message...');
//     socket.send(JSON.stringify({
//         type: "sendmessage",
//         payload: {
//             message: "hi there",
//             userid: "naveen123",
//             roomid: "room123",
//         }
//     }));
// }

// //document.getElementById('sendbutton').addEventListener('click', sendchat);

// socket.addEventListener('close', () => {
//   console.log('Disconnected from WebSocket server');
// });





// script.js
console.log('Script.js loaded.');
const ws = new WebSocket("ws://localhost:8000", "echo-protocol");

ws.onopen = function () {
  // Connection opened
  console.log("WebSocket connection opened");
};

ws.onmessage = function (event) {
  // Handle incoming messages from the server
  const data = JSON.parse(event.data);
  console.log("Received message:", data);
   console.log('Received acknowledgment from server:', data.payload);

  // Update the UI based on the received message
  if (data.type === "addchat" || data.type === "updatechat") {
    // Update the chat messages in the UI
    updateChatMessages(data.payload);
  }
};

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;


  if (message !== "") {
    // Send a message to the server
    ws.send(JSON.stringify({
      type: "sendmessage",
      payload: {
        message: message,
        userid: "naveen123",
        roomid: "room123",
      },
    }));

    // Clear the input field
    messageInput.value = "";
  }
}

function upvoteChat() {
  // Send an upvote message to the server
  ws.send(JSON.stringify({
    type: "upvotemessage",
    payload: {
      userid: "naveen123",
      roomid: "room123",
      chatid: "chat123", // Replace with the actual chat ID
    },
  }));
}

function updateChatMessages(payload) {
  // Update the chat messages in the UI
  const chatMessagesDiv = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `Name: ${payload.name}, Message: ${payload.message}, Upvotes: ${payload.upvotes}`;
  chatMessagesDiv.appendChild(messageDiv);
}
