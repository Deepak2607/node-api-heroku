//const MongoClient= require('mongodb').MongoClient;
const {MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {
    if(err){
        return console.log('unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    
    
    db.collection('Todos').findOneAndUpdate(
       {_id: new ObjectID('5ba392cfb0a3242760dcb103')},
       { $set:
         {text: 'study'}
       },
        {returnOriginal:false}
       ).then((result)=>{
        console.log(result);
    })

    
})