//import { connection } from "websocket";
//import { outgoingmessage } from "./messages/outgoingmessage";

class Usermanager{
    constructor(){
        this.rooms=new Map();
    }

adduser(name,userid,roomid,socket){
    //if there is no room then set the empty user
    console.log("Adding user:", name, userid, "to room:", roomid);
      if (!this.rooms.get(roomid)) {
            this.rooms.set(roomid, {
                users: [],
            });
        }

    this.rooms.get(roomid)?.users.push({
        id:userid,
        name,
        connection:socket,
    });
      console.log("User added successfully:", name, userid, "to room:", roomid);
    socket.on("close",(reasoncode,description)=>{
        this.removeuser(roomid,userid);
    })
}
//removeuser
        removeuser(roomid,userid){
            console.log("Removing user:", userid, "from room:", roomid);
            console.log("removeduser");
            const users=this.rooms.get(roomid)?.users;
            if(users){
                this.rooms.set(
                    roomid,
                    users.filter(({id})=>id!==userid)
                )
            }
             console.log("User removed successfully:", userid, "from room:", roomid);
        }
//get user
        getuser(roomid,userid){
            console.log("Getting user:", userid, "from room:", roomid);
            console.log("for get user",roomid,userid);
            const user=this.rooms.get(roomid)?.users.find(({userid:userId})=>userId===userid);
            return user||null;
        }
  
        //broadcast the message to all the users in the rooms
        broadcast(roomid,userid){
            console.log("Broadcasting message from user:", userid, "in room:", roomid);
            console.log("for get user",roomid,userid);
            const user=this.getuser(roomid,userid);
            
            if(!user){
                console.log(`User not found in roommmm ${roomid} with userid ${userid}`);
                return;
            }

            const room=this.rooms.get(roomid);
            if(!room){
                console.log("room not found");
                return;
     }

room.users.forEach(({connection,id})=>{
    if(id===userid){
        return;
    }
    else{
        console.log("outgoingmessage"+JSON.stringify(message));
        connection.sendUTF(JSON.stringify(message));
    }

});
console.log("Message broadcasted successfully to room:", roomid);
    }
}
export default Usermanager ;