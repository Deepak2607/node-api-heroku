const jwt= require('jsonwebtoken');

const data= {
    id:10
}

const token= jwt.sign(data, 'secret_code');
console.log(token);

const decoded= jwt.verify(token, 'secret_code');
console.log(decoded);