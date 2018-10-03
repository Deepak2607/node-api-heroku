//const mongoose= require('mongoose');
//
//mongoose.connect('mongodb://localhost:27017/TodoApp2');


const express= require('express');
const bodyParser= require('body-parser');

const {mongoose}= require('./db/mongoose');
const {Todo}= require('./models/todo');
const {User}= require('./models/user');
const _= require('lodash');
const port= process.env.PORT || 8000;


const app= express();

app.use(bodyParser.json());


app.post('/todos',(req,res)=> {
    
   const todo= new Todo({
        text: req.body.text
    });
    
    todo.save().then(()=> {
        res.send(todo);
    },
    (e)=> {
        res.status(400).send(e);
    });
    
});


app.get('/todos',(req,res)=> {
    Todo.find().then((todos)=>{
        res.send(todos);
    },
      (e)=> {
        res.status(400).send(e);
    }               
    )
})

app.get('/todos/:id',(req,res)=> {
    const id= req.params.id;
      
    Todo.findById(id).then((todo)=> {
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    },(e)=> {
        res.status(400).send();
    })
})

app.delete('/todos/:id',(req,res)=> {
    const id= req.params.id;
    
    Todo.findByIdAndRemove(id).then((todo)=> {
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    },(e)=> {
        res.status(400).send();
    })
})


app.post('/users',(req,res)=> {
    
    let user= new User(req.body);
    
   user.save().then(()=> {
       return user.generateAuthToken();
   }).then((token)=> {
       res.header('x-auth',token).send(user);
   },(e)=> {
       res.status(400).send(e);
   }) 
    
    // return user.generateAuthToken().then((token)=> {
    //     res.header('x-auth',token).send(user);
    // },(e)=> {
    //     res.status(400).send(e);
    // }) 
})



const authenticate= (req,res,next)=> {
    
    const token= req.header('x-auth');
    User.findByToken(token).then((user)=> {
        if(!user){
             return res.status(401).send();
        }
        
        req.user=user;
        req.token= token;
        next();
    },(e)=> {
         res.status(401).send();
    })
}

app.get('/users/me',authenticate,(req,res)=> {
        res.send(req.user);
})



app.post('/users/login',(req,res)=> {
    const body= _.pick(req.body, ['email','password']);
    
    User.findByCredentials(body.email, body.password).then((user)=> {
       
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
      
        })
        
    },(e)=> {
        res.status(400).send();
    })
})


app.delete('/users/me/token', authenticate, (req, res)=> {
    
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send(req.user);
    },()=> {
        res.status(400).send();
    })
})



app.listen(port,()=> {
    console.log(`Started on port ${port}`);
})






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








//const User= mongoose.model('Users',{
//    email:{
//        type:String,
//        required:true,
//        minlength:1,
//        trim:true
//    },
//})
//
//const user1= new User({
//    email:'  deepakkumrawat8@gmail.com   '
//})
//
//user1.save().then((result)=>{
//    console.log('user1--\n'+ result);
//},(err)=>{
//    console.log(err);
//})


