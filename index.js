console.log("start");


import http from 'http';
import  {WebSocketServer} from 'ws'


import Ismemorystore from "./src/store/Ismemorystore.js";
import  Usermanager from "./src/usermanager.js";
//import { WebSocketServer } from "websocket"; 
// import { chatsWithMoreThanTwoUpvotes, chatsWithLessThanOrEqualTwoUpvotes } from './src/store/Ismemorystore.js';

// // Now you can use the imported arrays as needed
// console.log("Chats with upvotes more than 2:", chatsWithMoreThanTwoUpvotes);
// console.log("Chats with upvotes less than or equal to 2:", chatsWithLessThanOrEqualTwoUpvotes);


const server=http.createServer(function(request,response){
    console.log(new Date()+''+request.url);
    response.writeHead(200, { 'Content-Type': 'text/plain'}); 
    response.end('web socket is running');
});

//create the memory store and manager
const memorystore=new Ismemorystore();
const manager=new Usermanager()

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocketServer({ server });



// WebSocket connection handling
wss.on('connection', (ws,request) => {
  console.log('Client connected');

  ws.on('message', (message) => {
           console.log(`Received message from client: ${message}`);
            // let parsedmessage; 
    try {
      const parsedmessage = JSON.parse(message);
       console.log("Received message from server:",parsedmessage);
       
            //   console.log("Room ID:", payload.roomid);
            // console.log("User ID:", payload.userId);
      if (parsedmessage.type === 'sendmessage') {
        console.log("inside the sendmessage");
             const chatRoom=memorystore;
             const payload= parsedmessage.payload;

             let chat = chatRoom.addchat(payload.userid,payload.username,payload.message, payload.chatid,payload.roomid);
            
           
           if (!chat) {
          // Send an error response back to the client if user not found
          ws.send(JSON.stringify({
            type: 'acknowledgment',
            payload: {
             // messageId: parsedmessage.messageId,
              status: 'error',
              error: 'User not found in room ' + payload.roomid + ' with userid ' + payload.userId,
            },
          }));
          return;
        }
// If chat was successfully added, send acknowledgment and echo the message back to the client
                ws.send(JSON.stringify({
                    type: 'acknowledgment',
                    payload: {
                        status: 'success',
                        message: 'Message sent successfully',
                    },
                }));

                // Echo the message back to the client
                ws.send(JSON.stringify(parsedmessage));


        const outgoingPayload = {
          type: "addchat",
          payload: {
            username: payload.username,
            message: payload.message, 
            roomid: payload.roomid,
            chatid: payload.chatid,
          },
        };

        // Assuming 'manager.broadcast' is a function to broadcast the message
        manager.broadcast(payload.roomid, payload.userId,payload.chatid, outgoingPayload);
        console.log("addchat",outgoingPayload);
      } else if (parsedmessage.type === 'upvotemessage') {
        // Handle 'upvote' logic if needed
        console.log("upvote");
                // chatRoom.upvotemessage(parsedmessage.payload.messageId, parsedmessage.payload.userId);
                // if(message.type==='upvotemessage'){
        // const payload=message.payload;
        // console.log("Upvote message:", payload);
 console.log("chat:",parsedmessage.payload.userid,parsedmessage.payload.roomid,parsedmessage.payload.chatid);
       const chat=memorystore.upvote(parsedmessage.payload.userid,parsedmessage.payload.roomid,parsedmessage.payload.chatid);
    console.log("inside upvote");
 console.log("chat",chat);

    
    if(!chat){
        return;
    }
    console.log("upvote 2");
   console.log("Upvote successful. Updated chat:", chat);
//    // Filter chat messages where upvotes are above 2
// function filterChatMessagesAboveTwoUpvotes(roomid) {
//   return roomid.chats.filter(chat => chat.upvotes.length > 2);
// }
// // Assuming 'room' is the room object
// const chatMessagesAboveTwoUpvotes = filterChatMessagesAboveTwoUpvotes(roomid);
// console.log("Chat messages with upvotes above 2:", chatMessagesAboveTwoUpvotes);







 const outgoingpayload={
    type:"updatechat",
    payload:{
       chatid:parsedmessage.payload.chatid,
       roomid:parsedmessage.payload.roomid,
       upvotes:chat.upvotes.length,
    },
 };
//  // Send the response back to the client
// // Check if upvotes exceed 10, create a new room if true
    
//     ws.send(JSON.stringify(outgoingpayload));

//   console.log("Outgoing payload for updatechat:", outgoingpayload);
  
//         // Check if upvotes exceed 10, then create a new room
//         if (chat.upvotes.length > 10) {
//           const newRoomId = 'newRoom' + Date.now(); 
//           // Broadcast the room creation event to the current room
//           manager.broadcast(parsedmessage.payload.roomid, parsedmessage.payload.userid, {
//             type: 'room_created',
//             payload: { newRoomId }
//           });
//           // Create a new room and move the chat message to the new room
//           // Add your logic here to create a new room and move the chat message
//         }

//         manager.broadcast(parsedmessage.payload.roomid,parsedmessage.payload.userid,outgoingpayload);
//         console.log("Broadcast completed for room:", parsedmessage.payload.roomid, "by user:", parsedmessage.payload.userid);

// const roomChats = {};
// function addChatToRoom(roomId, chat) {
//   if (!roomChats[roomId]) {
//     roomChats[roomId] = [];
//   }
//   roomChats[roomId].push(chat);
// }

// function fetchChatsForRoom(roomId) {
//   return roomChats[roomId] || [];
// }
//         // If upvotes exceed 10, create a new room
//         if (outgoingpayload.payload.upvotes > 2) {
//           const newRoomId = 'newRoom' + Date.now();
//           // Implement your logic to create a new room here
//           console.log("New room created:", newRoomId);

//             // Fetch chats for the new room from storage
//   const newRoomChats = fetchChatsForRoom(newRoomId); 

//           // Send a message to the client informing about the new room
//           ws.send(JSON.stringify({
//             type: 'new_room_created',
//             payload: {
//               newRoomId: newRoomId,
//               chats: newRoomChats
//             }
//           }));
//           // You can fetch chats for the new room using fetchChatsForRoom function
//   const chatsForNewRoom = fetchChatsForRoom(newRoomId);
//   console.log("Chats for new room:", chatsForNewRoom);
//         }
//         manager.broadcast(parsedmessage.payload.roomid,parsedmessage.payload.userid,outgoingpayload);
//         console.log("Broadcast completedddd for room:", parsedmessage.payload.roomid, "by user:", parsedmessage.payload.userid);



  console.log("upvote 3");
  manager.broadcast(parsedmessage.payload.roomid,parsedmessage.payload.userid,outgoingpayload);
  console.log("Broadcast completed for room:", parsedmessage.payload.roomid, "by user:", parsedmessage.payload.userid);

  

      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
});
  
      // Event listener for connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  

});

const PORT=8000;
//create the server
server.listen(PORT,function(){
console.log("server is listening on particular port");
});


    



  //function to handle incoming message
function messagehandler(ws,message){
    console.log("Handling message:", message);
 
    if(message.type==='joinroom'){
        const payload=message.payload;
        console.log("Join room:", payload);
        manager.adduser(payload.name,payload.userid,payload.roomid,ws)
    }


  


}


      // if (parsedmessage) {
      //   sendErrorAcknowledgment(ws, parsedmessage, 'Invalid message format');
      // }

  // if(message.type==='utf8'){
  //       try{
  //            messagehandler(connection,JSON.parse(message.utf8Data));
  //            console.log('Received Message: ' + message.utf8Data);
  //       }
  //       catch(e){

  //       }
  //   }
    
    // // Send an error response back to the client
    //   ws.send(JSON.stringify({
    //     type: 'acknowledgment',
    //     payload: {
    //       messageId: parsedmessage.messageId,
    //       status: 'error',
    //       error: 'Invalid message format',
    //     },
    //   }));

  




// //create the web socket server
// const wsserver=new WebSocketServer({
//     httpServer:server,
//     autoAcceptConnections:false,
// });
// wsserver.on('request',function(request){
//  console.log("inside connect");
// });




// function sendErrorAcknowledgment(ws, parsedmessage, error) {
//   // Send an error response back to the client
//   ws.send(JSON.stringify({
//     type: 'acknowledgment',
//     payload: {
//       messageId: parsedmessage?.messageId, // Use optional chaining to avoid TypeError
//       status: 'error',
//       error: error,
//     },
//   }));
//}


// if(message.type==='sendmessage'){
//         const payload=message.payload;
//         console.log("Send message:", payload);
//        const user=manager.getuser(payload.userid,payload.roomid)
    
//     if(!user){
//         console.log("user not found");
//         return;
//     }
//     //add a chat message to a store
//     let chat=memorystore.addchat(payload.roomid,user.name,payload.roomid,payload.message);

//     if(!chat){
//         return;
//     }
//  const outgoingpayload={
//     type:"addchat",
//     payload:{
//        name:user.name,
//        roomid:payload.roomid,
//        message:payload.message,
//        upvotes:0,
//        chatid:chat.id,
//     }
//  };

// manager.broadcast(payload.roomid,payload.userid,outgoingpayload);
// }

