const mongoose= require('mongoose');
const validator= require('validator');
const jwt= require('jsonwebtoken');
const _= require('lodash');
const bcrypt= require('bcryptjs');

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
        unique:true,
        validate: (value)=> {
            return validator.isEmail(value);
        },
        message:'{VALUE} is not a valid message'
    },
    password:{
        type:String,
        required:true,
        minlength:6 
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})


UserSchema.methods.generateAuthToken= function(){
    let user= this;
    const access= 'auth';
    const token= jwt.sign({_id:user._id.toHexString(), access}, 'secret_code').toString();
    
    user.tokens.push({access,token});
    
    return user.save().then(()=> {
        return token;
    })
}

UserSchema.methods.toJSON= function(){
    let user= this;
    let userObject= user.toObject();
    
    return _.pick(userObject, ['_id','email']);
}


UserSchema.pre('save',function(next){
    let user= this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt)=> {
            bcrypt.hash(user.password, salt, (err, hash)=> {
                user.password= hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

UserSchema.statics.findByToken= function(token){
    let User= this;
    let decoded;
    
    try{
        decoded= jwt.verify(token,'secret_code');
    } catch(err){
        return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth' 
    })
}

UserSchema.statics.findByCredentials= function(email, password){
    let User= this;
    
    return User.findOne({email:email}).then((user)=> {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject)=> {
            bcrypt.compare(password, user.password, (err,res)=> {
                if(res){
                    resolve(user);
                }
                else{
                    reject();
                }
            })
        })
    })
}



UserSchema.methods.removeToken= function(token){
    let user= this;
    
    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    })  
}


const User= mongoose.model('Users',UserSchema);

module.exports={
    User
}