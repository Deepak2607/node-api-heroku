const mongoose= require("./../server/db/mongoose");
const {Todo}= require("./../server/models/todo");
const {User}= require("./../server/models/user");
const {ObjectID}= require('mongodb');

const id= "5ba505db3ec23a33481607eb";

if(!ObjectID.isValid(id)){
    console.log('id not valid');
}

Todo.find({_id: id }).then((todos)=> {
    if(!todos){
        return console.log("id not found");
    }
    console.log(todos);
},(e)=> {
    console.log(e);
})

Todo.findOne({_id: id }).then((todo)=> {
    if(!todo){
        return console.log("id not found");
    }
    console.log(todo);
},(e)=> {
    console.log(e);
})

Todo.findById(id).then((todo)=> {
    if(!todo){
        return console.log("id not found");
    }
    console.log(todo);
},(e)=> {
    console.log(e);
})


User.findById('5ba50afcb90f932cf04b0218').then((user)=> {
    if(!user){
        return console.log("id not found");
    }
    console.log(user);
},(e)=>{
    console.log(e);
})




