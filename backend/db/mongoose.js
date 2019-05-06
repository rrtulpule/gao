var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');
//mongodb://<dbuser>:<dbpassword>@ds061370.mlab.com:61370/projectli
//mongodb://<dbuser>:<dbpassword>@ds145926.mlab.com:45926/cmpe281
//mongodb://<dbuser>:<dbpassword>@ds135456.mlab.com:35456/linkedinp1


mongoose.connect('mongodb+srv://cmpe281_user:cmpe281@cluster0-8rf4e.mongodb.net/cmpe281_nodedata?retryWrites=true',
{ useNewUrlParser: true, poolSize:100, useCreateIndex: true, },function(err, db) {
  if(err)
    console.log("Could not connect: ", err);
  else
  {
    console.log("Connected");
  }
  } );

module.exports = {mongoose};
