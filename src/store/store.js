const userid="String";
class Chat{
    constructor(id,userid,name,message,chatid,upvotes){
        this.id=id;
        this.userid=userid;
        this.name=name;
        this.message=message;
        this.chatid=chatid;        
        this.upvotes=upvotes;
    }
}

class Store{
    constructor() {}
    initroom(roomid){}
    getchats(room,limit,offset){}
    addchat(name,userid,room,message){}
    upvote(userid,room,chatid){}
}

// const chatinstance=new Chat("1","naveen123","johndoe","hello world",0);
// const storeinstance=new Store();

// storeinstance.initroom("room456");
// storeinstance.addchat("naveen","naveen456","room456","hello");
// storeinstance.upvote("naveen456","room456","3");

export{Store,Chat};