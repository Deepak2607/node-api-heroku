const MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {
    if(err){
        return console.log('unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    
    
//    db.collection('Todos').deleteMany({completed: true}).then((result)=> {
//        console.log(result);
//    })
//    
//    db.collection('Todos').deleteOne({completed: false}).then((result)=> {
//        console.log(result);
//    })
//    
//    db.collection('Todos').findOneAndDelete({text:'something to do'}).then((result)=> {
//        console.log(result);
//    })
    

})