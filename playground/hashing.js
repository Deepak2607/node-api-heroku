const bcrypt= require('bcryptjs');

const password= '123abc!';

bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(password, salt, (err, hash)=> {
        console.log(hash);
    } )
})

const hashedpassword= '$2a$10$r6ap3q8/YEG2yPq66/UjRuTCGs3mqZ579vhZPqIrHbLRJXy8BRu3C';
bcrypt.compare(password, hashedpassword, (err, result)=> {
    if(result){
        console.log('true');
    }
    else{
        console.log('false');
    }
})