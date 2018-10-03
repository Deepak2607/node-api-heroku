const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp2');







//const Todo= mongoose.model('Todo',{
//    text:{
//        type:String,
//        required:true,
//        minlength:1,
//        trim:true
//    },
//    completed:{
//        type:Boolean,
//        default:false
//    },
//    completedAt:{
//        type:Number,
//        default:null
//    }
//});
//
//const Todo1= new Todo({
//    text:'cook lunch'
//})
//
//Todo1.save().then((result)=>{
//    console.log('todo1--\n'+ result);
//},(err)=>{
//    console.log(err);
//})
//
//
//const Todo2= new Todo({
//    text:'cook dinner',
//    completed:true,
//    completedAt:123
//})
//
//Todo2.save().then((result)=>{
//    console.log('todo2--\n'+ result);
//},(err)=>{
//    console.log(err);
//})








const User= mongoose.model('Users',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
})

const user1= new User({
    email:'  deepakkumrawat8@gmail.com   '
})

user1.save().then((result)=>{
    console.log('user1--\n'+ result);
},(err)=>{
    console.log(err);
})


