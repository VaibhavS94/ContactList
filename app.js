//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'sample-nodejs',

  // Use if APM Server requires a token
  secretToken: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ''
})

var app = express();

const route = require('./routes/route');

//connect to mongoDb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on successfull database connection
mongoose.connection.on('connected',()=>{
    console.log("Connected to database successfully");
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log("Error in database connection: "+err);
    }
})


//port no
const port = 3000;

//adding middleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//routing
app.use('/api',route);

//testing routes
app.get('/',(req,res)=>{
    res.send('foobar');
})

app.post('/postingdata',(req,res,next)=>{
    var data = {
        firstname: req.body.first_name
    }

    console.log(data.firstname);
    res.json(data);
})

app.listen(port,()=>{
    console.log("Server started at port: "+port);
})