//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var {mongoose} = require('./db/mongoose');
// var mongoose = require('mongoose');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]
  var NodeSchema = mongoose.Schema({
    nodeId: String,
    installed_by: String,
    longitude: Number,
    latitude: Number,
    city: String,
    county: String,
    clusterid: String,
    postalcode: String,
    wind: Number,
    humidity: Number,
    rainfall: Number,
    temperature: Number
}); 

var ClusterSchema =mongoose.Schema({
    clusterID: String,
    name: String
});



//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    Users.filter(function(user){
        if(user.username === req.body.username && user.password === req.body.password){
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
        else{
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Unsuccessful");
        }
    })

    
});

app.post('/addnode',function(req,res){

     console.log("in add node");  
     console.log("Req Body : ", req.body);
    //  db.once('open', function() {
    //     console.log("Connection Successful!");
        
        // define Schema
     
     var Node = mongoose.model('nodedata', NodeSchema, 'nodedata'); 
     var nodesave=new Node({  nodeId: req.body.node_number,
        installed_by: req.body.installed_by,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        city: req.body.city,
        county: req.body.county,
        clusterid: req.body.clusterid,
        postalcode: req.body.postalcode,
        wind: 0,
        humidity: 0,
        rainfall: 0,
        temperature: 0 ,
     });
     console.log("Var Body : ",nodesave);  
     
     nodesave.save(function (err, book) {
        if (err)
        {
            
            console.error(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful data entry");
        }
        console.log(" saved to collection.");
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful data entry"); 
      });
      
    
});

app.post('/deletenode',function(req,res){

    console.log("in delete node");  
    console.log("Req Body : ", req.body);
    var Node = mongoose.model('nodedata', NodeSchema, 'nodedata'); 
    Node.deleteOne({ nodeId: req.body.node_number }, function(err) {
        if (!err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful data entry");
        }
        else {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful data entry"); 
        }
    });
   // console.log("Req Body : ",req.body);    
   // var newBook = {BookID : req.body.BookID, Title : req.body.Title, Author : req.body.Author};
   // books.push(newBook);
   // console.log("Books : ",JSON.stringify(books));
   // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
   // res.writeHead(200,{
   //     'Content-Type' : 'text/plain'
   // })
   // res.end("Successful Login"); 
});

app.post('/updatenode',function(req,res){

    console.log("in add node");  
    console.log("Req Body : ", req.body);
    var query = {'nodeId':req.body.node_number};
    var Node = mongoose.model('nodedata', NodeSchema, 'nodedata'); 
    
    Node.findByIdAndUpdate(query,{$set:{longitude: req.body.longitude,
        latitude: req.body.latitude,
        city: req.body.city,
        county: req.body.county,
        clusterid: req.body.clusterid,
        postalcode: req.body.postalcode,}},function(err, doc){
            if (err) return res.status(500).send( { error: err });
              res.end("succesfully saved");
        });
   // console.log("Req Body : ",req.body);    
   // var newBook = {BookID : req.body.BookID, Title : req.body.Title, Author : req.body.Author};
   // books.push(newBook);
   // console.log("Books : ",JSON.stringify(books));
   // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
   // res.writeHead(200,{
   //     'Content-Type' : 'text/plain'
   // })
   // res.end("Successful Login"); 
});

app.post('/addcluster',function(req,res){
    
    console.log("in add node");  
    console.log("Req Body : ", req.body);
    var Cluster = mongoose.model('clusterdata', ClusterSchema, 'clusterdata'); 
    var clusteradd=new Cluster({  clusterID: req.body.clusterid,
        name: req.body.name});
        clusteradd.save(function (err, book) {
            if (err)
            {
                
                console.error(err);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful data entry");
            }
            console.log(" saved to collection.");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful data entry"); 
          });
//     var index = books.map(function(book){
//         return book.BookID;
//      }).indexOf(req.body.BookID); 
//      books.splice(index, 1);
//     console.log("Index is :" + index);
//     console.log("Books : ",JSON.stringify(books));
//     res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//    // req.session.user = user;
//     res.writeHead(200,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("Successful Login");
    
   
    
});
app.post('/deletecluster',function(req,res){
    
    console.log("in add node");  
    console.log("Req Body : ", req.body);
    var Cluster = mongoose.model('clusterdata', ClusterSchema, 'clusterdata'); 
    Cluster.deleteOne({ clusterID: req.body.clusterid }, function(err) {
        if (!err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful data entry");
        }
        else {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful data entry"); 
        }
    });
   
//     var index = books.map(function(book){
//         return book.BookID;
//      }).indexOf(req.body.BookID); 
//      books.splice(index, 1);
//     console.log("Index is :" + index);
//     console.log("Books : ",JSON.stringify(books));
//     res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//    // req.session.user = user;
//     res.writeHead(200,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("Successful Login");
    
   
    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    // console.log("Books : ",JSON.stringify(books));
    // res.end(JSON.stringify(books));
    //res.send(books)
})
app.get('/getnode', function(req,res)
{
    console.log("Inside get node"); 
    var Node = mongoose.model('nodedata', NodeSchema, 'nodedata');  
    Node.find({}, function(err, users) {
        if(err)
        {
            res.status(400).send("Unsuccessful");
        }
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
        console.log(userMap);
        console.log(users);
        res.status(200).send(users);
    //      res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // });  
      });
    
    

  
})

app.get('/getclusters', function(req,res)
{
    console.log("Inside get cluster"); 
    var Cluster = mongoose.model('clusterdata', ClusterSchema, 'clusterdata'); 

    Cluster.find({}, function(err, users) {
        if(err)
        {
            res.status(400).send("Unsuccessful");
        }
       
        console.log(users);
        res.status(200).send(users);
    //      res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // });  
      });
    
    

  
})
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");