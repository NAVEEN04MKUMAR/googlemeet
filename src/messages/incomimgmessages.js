


import { z } from "zod";
const supportmessage={
    joinroom:"join_room",
    sendmessage:"send_message",
    upvotemessage:"upvote_message",
};


const initmessage=z.object({
    name:z.string(),
    userid:z.string(),
    roomid:z.string(),

});

const initmessagetype=initmessage.parse({
    name:"naveen",
    userid:"user567",
    roomid:"room567",
});


const usermessage=z.object({
    userid:z.string(),
    roomid:z.string(),
    message:z.string(),
});

const usermessagetype=usermessage.parse({
    userid:"naveen567",
    roomid:"room567",
    message:"hi",
});




const upvotemessage=z.object({
    userid:z.string(),
    roomid:z.string(),
    chatid:z.string(),
});

const upvotemessagetype=upvotemessage.parse({
    userid:"naveen567",
    roomid:"room567",
    chatid:"chat567",
});
export {
    supportmessage,
    initmessage,
    initmessagetype,
    usermessage,
    usermessagetype,
    upvotemessage,
    upvotemessagetype,
};