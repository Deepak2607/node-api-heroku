const MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {
    if(err){
        return console.log('unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    
    
    db.collection('Todos').find().toArray().then( (docs)=>{
            console.log(JSON.stringify(docs, undefined, 2));  
    },
    (err)=>{
            console.log('unable to fetch todos \n',err);
    }) 
    
    
    db.collection('Todos').find({completed:true}).toArray().then( (docs)=>{
            console.log(JSON.stringify(docs, undefined, 2));  
    },
    (err)=>{
            console.log('unable to fetch todos \n',err);
    }) 
    
    
//    db.collection('Todos').find({
//        _id: new ObjectID('5ba3a7d544bc340294d21c72')
//    }
//    ).toArray().then( (docs)=>{
//            console.log(JSON.stringify(docs, undefined, 2));  
//    },
//    (err)=>{
//            console.log('unable to fetch todos \n',err);
//    }) 
    
    
    db.collection('Todos').find().count().then( (count)=>{
            console.log('total count: '+ count);  
    },
    (err)=>{
            console.log('unable to fetch todos \n',err);
    })
    
})