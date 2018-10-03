const MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=> {
    if(err){
        return console.log('unable to connect to mongodb server',err);
    }
    console.log('Connected to mongodb server \n');
    
    //console.log(db);

    
    db.collection('Todos').insertOne({
        text:'something to do',
        completed: false
    }, (err, result) =>{
        if(err){
            return console.log('unable to insert todo',err);
        }
        console.log('new todo inserted--');
        console.log(result.ops);
        console.log('\n');
        
    })
    
    
    db.collection('Users').insertOne({
        name:'Deepak',
        age:21,
        Location:'Gwalior'
        //objectID can be defined here specifically...
    },(err,result) =>{
        if(err){
            return console.log('unable to insert todo',err);
        }
        console.log('new user inserted--');
        console.log(result.ops); 
        console.log(result.ops[0]._id.getTimestamp());
        console.log('\n');
    })
    
    
    db.close();

});