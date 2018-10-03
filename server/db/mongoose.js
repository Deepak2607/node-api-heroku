const mongoose= require('mongoose');

mongoose.Promise= global.Promise;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp2');

module.exports={mongoose};
