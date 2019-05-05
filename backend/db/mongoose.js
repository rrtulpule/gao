var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');
//mongodb://<dbuser>:<dbpassword>@ds061370.mlab.com:61370/projectli
//mongodb://<dbuser>:<dbpassword>@ds145926.mlab.com:45926/cmpe281
//mongodb://<dbuser>:<dbpassword>@ds135456.mlab.com:35456/linkedinp1


mongoose.connect('mongodb+srv://rajas:rajas@cmpe281-6vnts.mongodb.net/test?retryWrites=true',function(err, db) {
  if(err)
    console.log("Could not connect: ", err);
  else
  {
    console.log("Connected");
  }
  } );

module.exports = {mongoose};
