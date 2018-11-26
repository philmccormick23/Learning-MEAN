var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res){
	if(!req.session.Data){
		req.session.Data = {};
	}
	console.log(__dirname);
  	res.render('form', {});
})

app.post('/users', function (req, res){
    var data = req.body;
    console.log(req.body);
  	res.redirect('/');
})


// tell the express app to listen on port 8000, always put this at the end of your server.js file
port=8000;
var server = app.listen(port, function() {
    console.log("Listening on Port: ", port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('connected socket', socket.id);
        socket.on('socket_button_clicked', function (data){
            console.log('Someone clicked a button!  Reason: '  + data.reason);
            socket.emit('server_response', {response:  "sockets are the best!"});
        });
        socket.on( "posting_form", function (data){
            console.log(data);
            console.log( "You emitted the following information to the server: "  + data.name + " " + data.email);
            socket.emit( "random_number", {random_number:  Math.floor(Math.random()*1000)+1});
            socket.emit( "updated_message", {response: data});
        })
        socket.emit( "posting_form", function (data){
            console.log(data);
            console.log( "You emitted the following information to the server: "  + data.name + " " + data.email);
            socket( "random_number", {random_number:  Math.floor(Math.random()*1000)+1});
            socket.emit( "updated_message", {response: data});
        })
});


