console.log("imemorystore");
import {Store} from "./store.js";
// import WebSocket from 'ws';
// // const wss = new WebSocket.Server({ port: 8080 });


// // // Function to send data to all connected clients
// // function broadcast(data) {
// //   wss.clients.forEach(client => {
// //     if (client.readyState === WebSocket.OPEN) {
// //       client.send(JSON.stringify(data));
// //     }
// //   });
// // }

// // // Function to filter chats based on upvotes
// // function filterChats(chats) {
// //   const mTwoUpvotes = chats.filter(chat => chat.upvotes.length > 2);
// //   const leTwoUpvotes = chats.filter(chat => chat.upvotes.length <= 2);
// //   return { mTwoUpvotes, leTwoUpvotes };
// // }


class Chat{
    constructor(id,userid,username,message,chatid){
        this.id=id;
        this.userid=userid;
        this.username=username;
        this.message=message;
        this.chatid=chatid;        
        this.upvotes=[];
    }
}

class Room{
    constructor(roomid,chats){
        this.roomid=roomid;
        this.chats=chats;
    }
}

let globalchatid=1;

class  Ismemorystore extends Store{
    constructor(){
        super();
        this.store=new Map();
    }

    initroom(roomid){
        this.store.set(roomid,{
            roomid,
            chats:[],
        });
    }



    
    getchats(roomid,limit,offset){
        console.log('Fetching chats for room:', roomid);
        const room=this.store.get(roomid);
        if(!room){
            console.log('Room not found.');
            return [];
        }
        console.log('Room found. Total chats:', room.chats.length);
const reversedchats = room.chats.reverse();
    console.log('Reversed chats:', reversedchats);

    const slicedchats = reversedchats.slice(0, offset).slice(-1 * limit);
    console.log('Sliced chats:', slicedchats);

    return slicedchats; 
   }



    addchat(userid,username,message,chatid,roomid){
        console.log("add chat",userid,username,message,chatid,roomid);
        if(!this.store.get(roomid)){
            this.initroom(roomid);
        }
        const room =this.store.get(roomid);
        console.log("chat",room);

        if(!room){
            return;
        }
        const chat=new Chat((globalchatid++).toString(),userid,username,message,chatid,[]);
                console.log("chat",chat);
        room.chats.push(chat);
        return chat;
    }



       upvote(userid,roomid,chatid){
         console.log('Upvoting message for user:', userid, 'in room:', roomid, 'with chat ID:', chatid);

        const room=this.store.get(roomid);
       console.log('Room:', room);
       const chats = room.chats;
       console.log('chats',chats);
    //    const upvotes = chats.upvotes.length;
    //           console.log('upvote',upvotes);

// Assuming you have the `chats` array containing Chat objects as shown

if (chats && chats.length > 0) {
  // Iterate over each chat in the array
  chats.forEach(chat => {
    // Check if the chat object and its upvotes array are defined
    if (chat && chat.upvotes&&chat.upvotes.length > 2) {
      // Access the upvotes array of the chat and count its length
      const numberOfUpvotes = chat.upvotes.length;
      console.log(`Number of upvotes for chat ${chat.id}:`, numberOfUpvotes);
      console.log(`User message with upvotes more than 2:`, chat.message);
    } else {
      console.log(`Chat object or its upvotes array is undefined or empty.`);
    }
  });
} else {
  console.log(`Chats array is undefined or empty.`);
}
// Filter chats with upvotes more than 2
 const mTwoUpvotes = chats.filter(chat => chat.upvotes.length > 2);

// Filter chats with upvotes less than or equal to 2
 const leTwoUpvotes = chats.filter(chat => chat.upvotes.length <= 2);

// Now you have two separate arrays: one for chats with more than 2 upvotes and another for chats with less than or equal to 2 upvotes
console.log("Chats with upvotes more than 2:", mTwoUpvotes);
console.log("Chats with upvotes less than or equal to 2:", leTwoUpvotes);

 






// // Send chatsWithMoreThanTwoUpvotes to the client
// ws.send(JSON.stringify({
//   type: 'chats_with_more_than_two_upvotes',
//   payload: chatsWithMoreThanTwoUpvotes
// }));
// console.log("payload for the >2",  chatsWithMoreThanTwoUpvotes);
// // Send chatsWithLessThanOrEqualTwoUpvotes to the client
// ws.send(JSON.stringify({
//   type: 'chats_with_less_than_or_equal_to_two_upvotes',
//   payload: chatsWithLessThanOrEqualTwoUpvotes
// }))
// console.log("payload for the <=2",chatsWithLessThanOrEqualTwoUpvotes);








        if(!room){
             throw new Error(`Room ${roomid} not found`);
        }

       const chat=room.chats.find(({chatid: chatId})=>chatId==chatid);       

       if (!chat) {
       throw new Error(`Chat ${chatid} not found in roomm ${roomid}`);
       }

  if (!chat.upvotes) {
    chat.upvotes = [];
  }

        if(chat.upvotes.find((x)=>x===chatid)){
             throw new Error(`Chat ${chatid} not found in roommm ${roomid}`);
        }
        chat.upvotes.push(userid);
      return chat;
    }
}
// export { mTwoUpvotes, leTwoUpvotes };

// const Ismemorystoreinstance=new Ismemorystore();
// Ismemorystoreinstance.initroom("room234");
// Ismemorystoreinstance.addchat("user234","johndoe","room234","hello world");
// Ismemorystoreinstance.upvote("user234","room234","1");

// Ismemorystoreinstance.initroom("room345");
// Ismemorystoreinstance.addchat("user345","johndoe","room345","world");
// Ismemorystoreinstance.upvote("user345","room345","2");

// Assuming you have initialized an instance of Ismemorystore called 'store'

// Initialize room with ID 'room123'
 const Ismemorystoreinstance=new Ismemorystore();
Ismemorystoreinstance.initroom('room123');

// Create a chat and add it to the room
const chat1 = new Chat(1, 'naveen123', 'naveen', 'message1', 'chatid1');
const chat2 = new Chat(2, 'userid2', 'username2', 'message2', 'chatid2');

Ismemorystoreinstance.addchat('room123', chat1);
Ismemorystoreinstance.addchat('room123', chat2);

// Access the room and its chats
const room =Ismemorystoreinstance.store.get('room123');
if (room) {
    console.log(`Chats available for room ${room.roomid}:`);
    room.chats.forEach(chat => {
        console.log(chat);
    });
} else {
    console.log('Room not found.');
}



export default Ismemorystore;