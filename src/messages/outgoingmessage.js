export const supportmessage={
    addchat:"add_chat",
    updatechat:"update_chat",
}

const messagepayload={
    name:"",
    roomid:"",
    message:"",
    chatid:"",
    upvote:0,
}


export const outgoingmessage={
    type:supportmessage.addchat,
    payload:{...messagepayload},
}|{
    type:supportmessage.updatechat,
    payload:{},
};







