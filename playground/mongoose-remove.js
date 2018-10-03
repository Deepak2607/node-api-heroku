const mongoose= require("./../server/db/mongoose");
const {Todo}= require("./../server/models/todo");
const {User}= require("./../server/models/user");
const {ObjectID}= require('mongodb');




Todo.remove().then((todo)=> {
    console.log(todo);
},(e)=> {
    console.log(e);
});


Todo.findOneAndRemove().then((todo)=> {
    console.log(todo);
},(e)=> {
    console.log(e);
});


Todo.findByIdAndRemove("5ba505db3ec23a33481607eb").then((todo)=> {
    console.log(todo);
},(e)=> {
    console.log(e);
});

